import { Request, Response } from "express";
import Logger from "../../../config/logger";
import Discente from "../../model/Discente";
import IDiscente from "../../interfaces/Discente/IDiscente";

const create = async (req: Request, res: Response) => {
    try {
        const discente: IDiscente = req.body;

        const discenteCreated: IDiscente = await Discente.create({data: discente});

        res.send(discenteCreated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

export default {
    create
}