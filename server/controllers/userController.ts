import { Request, Response } from "express"
import prisma from "../lib/prisma.js";
import openai from "../configs/openai.js";


//! Get User Credits
export const getUserCredits = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        res.json({ credits: user?.credits })
    } catch (error: any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

//! Controller func to create a new project
export const createUserProject = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const { initial_prompt } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (user && user.credits < 5) {
            return res.status(403).json({ message: "Add credits to create more projects" });
        }

        //* Create new project
        const project = await prisma.websiteProject.create({
            data: {
                name: initial_prompt.length > 50 ? initial_prompt.substring(0, 47) + '...' : initial_prompt,
                initial_prompt,
                userId
            }
        })

        //* Update User's total Creation
        await prisma.user.update({
            where: { id: userId },
            data: { totalCreation: { increment: 1 } }
        })

        await prisma.conversation.create({
            data: {
                role: 'user',
                content: initial_prompt,
                projectId: project.id
            }
        })

        await prisma.user.update({
            where: { id: userId },
            data: { credits: { decrement: 5 } }
        })

        res.json({ projectId: project.id });

        //* Enhance user prompt
        let enhancedPrompt = "";

        try {
            const promptEnhanceResponse = await openai.chat.completions.create({
                model: "openrouter/free",
                messages: [
                    {
                        role: "system",
                        content: `
You are a prompt enhancement specialist. Take the user's website request and expand it into a detailed, comprehensive prompt that will help create the best possible website.

Enhance the prompt by:
1. Adding specific design details (layout, color scheme, typography)
2. Specifying key sections and features
3. Describing the user experience and interactions
4. Including modern web design best practices
5. Mentioning responsive design requirements
6. Adding any missing but important elements

Return ONLY the enhanced prompt, nothing else. Make it detailed but concise (2-3 paragraphs max).
                        `,
                    },
                    {
                        role: "user",
                        content: initial_prompt,
                    },
                ],
            });

            enhancedPrompt = promptEnhanceResponse.choices[0].message.content || "";

        } catch (error: any) {
            console.error("❌ Prompt Enhancement Error");
            console.error(error);
            throw error;
        }

        await prisma.conversation.create({
            data: {
                role: 'assistant',
                content: `I've enhanced your prompt to: "${enhancedPrompt}"`,
                projectId: project.id
            }
        })

        await prisma.conversation.create({
            data: {
                role: 'assistant',
                content: 'now generating your website...',
                projectId: project.id
            }
        })

        //* Generate website code
        let code = "";

        try {
            const codeGenerationResponse = await openai.chat.completions.create({
                model: "openrouter/free",
                messages: [
                    {
                        role: "system",
                        content: `You are an expert web developer...`
                    },
                    {
                        role: "user",
                        content: enhancedPrompt
                    }
                ]
            });

            code = codeGenerationResponse.choices[0].message.content || "";

        } catch (error: any) {
            console.error("❌ Code Generation Error");
            console.error(error);
            throw error;
        }

        //* Create Version for the project
        const version = await prisma.version.create({
            data: {
                code: code
                    .replace(/```[a-z]*\n?/gi, "")
                    .replace(/```$/g, "")
                    .trim(),
                description: "Initial version",
                projectId: project.id,
            },
        });

        await prisma.conversation.create({
            data: {
                role: 'assistant',
                content: "I've created your website! You can now preview it and request any changes.",
                projectId: project.id
            }
        })

        await prisma.websiteProject.update({
            where: { id: project.id },
            data: {
                current_code: code
                    .replace(/```[a-z]*\n?/gi, "")
                    .replace(/```$/g, "")
                    .trim(),
                current_version_index: version.id
            }
        })

    } catch (error: any) {
        console.error("========== FINAL ERROR ==========");
        console.error(error);
        console.error("Code:", error?.code);
        console.error("Message:", error?.message);
        console.error("Status:", error?.status);
        console.error("Response:", error?.response?.data);

        await prisma.user.update({
            where: { id: userId },
            data: { credits: { increment: 5 } }
        });

        if (!res.headersSent) {
            res.status(500).json({ message: error.message });
        }
    }
}

//! Controller func to GET a Single User Project
export const getUserProject = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { projectId } = req.params;

        const project = await prisma.websiteProject.findUnique({
            where: { id: Array.isArray(projectId) ? projectId[0] : projectId, userId },
            include: {
                conversation: {
                    orderBy: { timestamp: 'asc' }
                },
                versions: { orderBy: { timestamp: 'asc' } }
            }
        })

        res.json({ project })

    } catch (error: any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

//! Controller Function to get All Users Projects
export const getUserProjects = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const projects = await prisma.websiteProject.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' }
        })

        res.json({ projects })

    } catch (error: any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

//! Controller Function to Toggle Project Publish
export const togglePublish = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const projectId = req.params;

        const project = await prisma.websiteProject.findUnique({
            where: { id: Array.isArray(projectId) ? projectId[0] : projectId, userId }
        })

        if (!project) {
            return res.status(404).json({ message: 'Project not found' })
        }

        await prisma.websiteProject.update({
            where: { id: Array.isArray(projectId) ? projectId[0] : projectId },
            data: { isPublished: !project.isPublished }
        })

        res.json({ message: project.isPublished ? 'Project Unpublished' : 'Published Successfully' })

    } catch (error: any) {
        console.log(error.code || error.message);
        res.status(500).json({ message: error.message });
    }
}

//! Controller function to purchase Credits
export const purchaseCredits = async (req: Request, res: Response) => {

}