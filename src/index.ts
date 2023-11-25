import { config } from "dotenv";
import app from "./app";
import Logger from "../config/logger";

config();

const portApplication: string | undefined = process.env.PORT;

app.listen(portApplication, () => {
    Logger.info(`Application running on the port ${portApplication}`);
})