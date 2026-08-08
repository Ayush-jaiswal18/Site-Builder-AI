# ⚡ SiteBuilder AI

### Build. Edit. Version. Publish. — All with AI.

**SiteBuilder AI** is a next-generation AI website builder that turns natural-language prompts into production-ready static websites.

Describe what you want.  
Let AI generate the code.  
Iterate with prompts.  
Version every change.  
Preview it instantly.  
Publish when you're ready.

<br />

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

</div>

<br />

<div align="center">

**Turn ideas into websites — without writing the code yourself.**

</div>

---

## ✨ What is SiteBuilder AI?

SiteBuilder AI combines **generative AI + a visual website workflow + version control + cloud publishing** into one platform.

Instead of manually building a website from scratch, users can simply describe their idea:

> "Create a modern SaaS landing page for an AI productivity platform with a dark theme, pricing section, testimonials, and a CTA."

SiteBuilder AI generates a complete standalone HTML website styled with Tailwind utilities.

Users can then continue iterating:

> "Make the hero section more premium."

> "Add a testimonials section."

> "Change the color palette to purple and blue."

> "Make the navbar sticky."

Every generation becomes a new version — so users can experiment without losing previous work.

---

## 🏗️ System Architecture

<div align="center">

<img src="./client/src/assets/Architecture.png" alt="SiteBuilder AI System Architecture" width="100%">

</div>

---

# 🚀 Core Features

| Feature | Description |
|---|---|
| 🤖 **AI Website Generation** | Generate complete websites from natural-language prompts |
| ✨ **AI Revisions** | Modify existing websites using conversational instructions |
| 🕐 **Version History** | Every AI-generated change is automatically stored |
| ↩️ **Rollback** | Restore previous versions whenever needed |
| 👀 **Live Preview** | Instantly preview generated websites |
| 🌐 **Publishing** | Publish projects and make them publicly accessible |
| 💳 **Credits System** | AI generations consume credits |
| 💰 **Stripe Payments** | Purchase credits securely through Stripe |
| 🔐 **Authentication** | Secure user authentication with Better Auth |
| 🗄️ **PostgreSQL** | Persistent project, user, version and transaction data |
| ⚡ **Modern UI** | React + Tailwind powered interface |

---

# 🧠 How It Works

```text
              ┌──────────────────┐
              │     User Prompt  │
              │ "Build a SaaS..."│
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │  Prompt Enhancer │
              │       AI         │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   Code Generator │
              │       AI         │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   HTML + Tailwind│
              └────────┬─────────┘
                       │
              ┌────────┴─────────┐
              ▼                  ▼
       ┌──────────────┐   ┌──────────────┐
       │    Preview   │   │   Version DB │
       └──────┬───────┘   └──────────────┘
              │
              ▼
       ┌──────────────┐
       │    Publish   │
       └──────────────┘
````

### The Generation Pipeline

**1. Prompt**

The user describes the website or requested change.

**2. Prompt Enhancement**

The backend transforms the raw request into a structured, actionable instruction for the code generator.

**3. AI Code Generation**

The OpenAI API generates a complete standalone HTML document using Tailwind utilities.

**4. Version Creation**

The generated result is stored as a new `Version`.

**5. Preview**

The user can immediately inspect the generated website.

**6. Iterate**

The user can continue giving instructions and generate new versions.

**7. Publish**

The final version can be published publicly.

---

# 🛠️ Tech Stack

## Frontend

* **React 19**
* **TypeScript**
* **Vite**
* **Tailwind CSS**

## Backend

* **Node.js**
* **Express 5**
* **TypeScript**
* **OpenAI SDK**
* **Stripe**
* **Better Auth**

## Database

* **PostgreSQL**
* **Prisma ORM**

## Infrastructure

* Vercel / Netlify — Client
* Render / Railway / Fly.io — Server
* Supabase / Neon / AWS RDS — PostgreSQL

---

# 📁 Project Structure

```text
SiteBuilder/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── assets/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── server.ts
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# ⚡ Getting Started

## Prerequisites

Make sure you have:

* Node.js **18+**
* npm / pnpm / yarn
* PostgreSQL
* OpenAI API key
* Stripe account

---

## 1. Clone the Repository

```bash
git clone <repo-url>

cd SiteBuilder
```

---

## 2. Configure the Server

```bash
cd server

cp .env.example .env
```

Add your environment variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

OPENAI_API_KEY=sk-...

STRIPE_SECRET_KEY=sk_test_...

STRIPE_WEBHOOK_SECRET=whsec_...

TRUSTED_ORIGINS=http://localhost:5173
```

> ⚠️ Never commit your `.env` file or expose API keys in the frontend.

---

## 3. Install Server Dependencies

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

---

## 4. Install Client Dependencies

Open another terminal:

```bash
cd client

npm install
```

---

## 5. Start the Application

### Terminal 1 — Backend

```bash
cd server

npm run dev
```

### Terminal 2 — Frontend

```bash
cd client

npm run dev
```

Open the application:

```text
http://localhost:5173
```

API:

```text
http://localhost:3000
```

---

# 🗄️ Database & Prisma

The application uses PostgreSQL with Prisma ORM.

### Generate Prisma Client

```bash
npx prisma generate
```

### Create a Migration

```bash
npx prisma migrate dev --name <migration-name>
```

### Push Schema

```bash
npx prisma db push
```

> `db push` is recommended only for development workflows where migration history is not required.

---

# 🤖 AI Generation

SiteBuilder AI uses the OpenAI SDK for two major workflows.

## Prompt Enhancement

```text
User Request
     │
     ▼
"Make the website look better"
     │
     ▼
AI Prompt Enhancement
     │
     ▼
Structured Design Instructions
```

The enhanced prompt provides the code generator with clearer requirements.

## Website Generation

```text
Enhanced Prompt
       │
       ▼
    OpenAI
       │
       ▼
Standalone HTML
       │
       ▼
Tailwind CSS
       │
       ▼
Version Stored
```

The generated website is treated as **untrusted content** and should be sanitized before being publicly served.

---

# 💳 Credits & Stripe

SiteBuilder AI follows a credit-based usage model.

```text
             User
               │
               ▼
        ┌──────────────┐
        │ Buy Credits  │
        └──────┬───────┘
               │
               ▼
            Stripe
               │
               ▼
          Webhook Event
               │
               ▼
      ┌─────────────────┐
      │ Grant Credits   │
      └─────────────────┘
               │
               ▼
       AI Generation
               │
               ▼
       Credits Deducted
```

Stripe webhook events are handled by:

```text
server/controllers/stripeWebhook.ts
```

---

# 🔐 Security

Security is a core consideration because SiteBuilder AI generates and serves HTML.

### Production Checklist

* [ ] Never commit API keys
* [ ] Use HTTPS
* [ ] Configure trusted origins
* [ ] Add API rate limiting
* [ ] Validate request payloads
* [ ] Sanitize generated HTML
* [ ] Restrict executable scripts
* [ ] Protect Stripe webhook endpoints
* [ ] Monitor OpenAI API usage
* [ ] Store secrets using environment variables or a secret manager

### ⚠️ Important

AI-generated HTML should always be treated as **untrusted input**.

Never assume generated code is safe simply because it came from an AI model.

---

# 🧪 Testing

Recommended testing setup:

## Client

```bash
npm run test
```

Recommended:

* Vitest
* React Testing Library

## Server

Recommended:

* Vitest
* Jest
* Supertest

Critical areas to test:

```text
Authentication
     ↓
Project Creation
     ↓
AI Generation
     ↓
Version Creation
     ↓
Credit Deduction
     ↓
Stripe Webhooks
     ↓
Publishing
```

---

# 🔄 Development Scripts

## Server

| Command         | Purpose                  |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build TypeScript         |
| `npm run start` | Start production server  |

## Client

| Command           | Purpose                       |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start Vite development server |
| `npm run build`   | Build production application  |
| `npm run preview` | Preview production build      |

---

# 🚀 Deployment

## Frontend

Recommended platforms:

* Vercel
* Netlify
* Cloudflare Pages

Build:

```bash
npm run build
```

Production output:

```text
client/dist
```

---

## Backend

Recommended platforms:

* Render
* Railway
* Fly.io
* AWS
* Azure

Configure production environment variables:

```env
DATABASE_URL=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
TRUSTED_ORIGINS=
```

---

## PostgreSQL

Recommended managed providers:

* Supabase
* Neon
* AWS RDS

---

# 📊 Future Roadmap

## 🟢 Core

* [x] AI website generation
* [x] AI revisions
* [x] Version history
* [x] Preview
* [x] Publishing
* [x] Credits
* [x] Stripe integration
* [x] Authentication

## 🟡 Next

* [ ] Visual drag-and-drop editor
* [ ] AI-powered design suggestions
* [ ] Custom domains
* [ ] Automated HTML sanitization
* [ ] Usage analytics
* [ ] Per-user quotas
* [ ] Email notifications
* [ ] Project duplication
* [ ] Public project gallery

## 🔵 Future

* [ ] AI image generation
* [ ] AI-generated assets
* [ ] Multi-page websites
* [ ] Component-level editing
* [ ] GitHub integration
* [ ] One-click deployments
* [ ] Custom domain management
* [ ] Team collaboration
* [ ] Real-time collaborative editing

---

# 📈 Observability

Production deployments should include:

## Error Tracking

**Sentry**

Monitor:

```text
API Errors
Database Errors
AI Failures
Stripe Webhooks
Publishing Failures
```

## Usage Monitoring

Track:

```text
AI Requests
Tokens Used
Credits Consumed
Failed Generations
Average Generation Cost
```

This helps prevent unexpected OpenAI API costs and abuse.

---

# 🤝 Contributing

Contributions are welcome.

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m "feat: add amazing feature"

# Push branch
git push origin feature/amazing-feature
```

Then open a Pull Request with:

* What changed
* Why it changed
* Screenshots if applicable
* Testing performed

---

# 📜 License

This project is currently unlicensed.

For open-source distribution, **MIT** is recommended.

Add a `LICENSE` file to the project root before publishing the repository publicly.

---

# 🌟 Project Vision

SiteBuilder AI aims to make web development accessible through natural language.

The goal isn't just to generate code.

It's to create a complete workflow:

```text
          IDEA
           │
           ▼
        PROMPT
           │
           ▼
      AI GENERATION
           │
           ▼
         EDIT
           │
           ▼
        VERSION
           │
           ▼
        PREVIEW
           │
           ▼
        PUBLISH
           │
           ▼
        WEBSITE
```

### **Describe it. Build it. Iterate it. Ship it.**

---

<div align="center">

### ⚡ Built with AI, TypeScript & a lot of caffeine.

If you found this project useful, consider giving it a ⭐

**SiteBuilder AI — From prompt to production.**

</div>

