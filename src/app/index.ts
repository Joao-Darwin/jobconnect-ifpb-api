import cors from "cors";
import express, { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req: Request, res: Response): Response<string> => {
    return res.status(200).send("Hello World");
})

export default app;