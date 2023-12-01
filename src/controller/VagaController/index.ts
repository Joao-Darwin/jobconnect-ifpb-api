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

const findById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const vancancy = await Vagas.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                descricao: true,
                perfilProfissional: true,
                procedimento: true,
                created_at: true,
                updated_at: true,
                discentes: {
                    select: {
                        _count: true
                    }
                },
                empresa: {
                    select: {
                        nome: true,
                        email: true
                    }
                }

            }
        })

        if(vancancy) {
           return res.send(vancancy);
        }

        return res.status(404).json(`Vaga dont foud. Id: ${id}`);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (await vancancyNotExist(id)) {
            return res.status(404).json(`Vancancy not found. Id: ${id}`);
        }

        const vancancyToUpdate: IVaga = req.body;

        const vancancyUpdated = await Vagas.update({
            where: { id: id },
            data: vancancyToUpdate,
            select: {
                id: true,
                descricao: true,
                perfilProfissional: true,
                procedimento: true,
                created_at: true,
                updated_at: true,
                discentes: {
                    select: {
                        _count: true
                    }
                },
                empresa: {
                    select: {
                        nome: true,
                        email: true
                    }
                }

            }
        });

        return res.send(vancancyUpdated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const vancancyNotExist = async (id: string): Promise<boolean> => {
    const vancancyToUpdate = await Vagas.findFirst({ where: { id: id } });

    const exist = vancancyToUpdate ? false : true;

    return exist;
}

export default {
    create,
    findAll,
    findById,
    update
}