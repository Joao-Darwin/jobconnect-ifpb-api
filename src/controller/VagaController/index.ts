import { Request, Response } from "express";
import Logger from "../../../config/logger";
import IVaga from "../../interfaces/Vaga/IVaga";
import Vagas from "../../model/Vagas";

const create = async (req: Request, res: Response) => {
    try {
        const vaga: IVaga = req.body;

        const vagaCreated: IVaga = await Vagas.create({
            data: vaga,
            select: {
                id: true,
                descricao: true,
                perfilProfissional: true,
                procedimento: true,
                empresaId: true
            }
        })

        res.send(vagaCreated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const findAll = async (req: Request, res: Response) => {
    try {
        const vancancies = await Vagas.findMany({
            select: {
                id: true,
                created_at: true,
                updated_at: true,
                empresa: {
                    select: {
                        nome: true,
                        email: true
                    }
                }
            }
        });

        res.send(vancancies);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

export default {
    create,
    findAll
}