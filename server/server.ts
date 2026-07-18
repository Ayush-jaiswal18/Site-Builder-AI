import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";

const app = express();
const port =  3000;

const corsOption = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,
}

app.use(cors(corsOption))
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});