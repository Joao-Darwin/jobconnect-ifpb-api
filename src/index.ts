import express, { Request, Response } from "express";
import { config } from "dotenv";

config();

const app = express();
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
    return res.send("Hello World");
})

const portApplication = process.env.PORT;

app.listen(portApplication, () => {
    console.log(`Application running on the port ${portApplication}`);
})