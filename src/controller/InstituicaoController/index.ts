import { Request, Response } from "express";
import Logger from "../../../config/logger";
import IInstituicao from "../../interfaces/Instituicao/IInstituicao";
import IInstituicaoWithDates from "../../interfaces/Instituicao/IInstituicaoWithDates";
import Instituicao from "../../model/Instituicao";
import { createHashPassword } from "../../util/bcrypt";
import IInstituicaoDTO from "../../interfaces/Instituicao/DTOs/IInstituicaoDTO";

interface IInstituicaoWithPassword extends IInstituicao {
    password: string
}

const create = async (req: Request, res: Response) => {
    try {
        const instituicao: IInstituicaoWithPassword = req.body;

        instituicao.password = await createHashPassword(instituicao.password);

        const instituicaoCreated: IInstituicaoWithDates = await Instituicao.create({
            data: instituicao, select: {
                id: true,
                cnpj: true,
                email: true,
                nome: true,
                created_at: true,
                updated_at: true
            }
        });

        res.status(201).send(instituicaoCreated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const findAll = async (req: Request, res: Response) => {
    try {
        const instituicoes: IInstituicaoDTO[] = await Instituicao.findMany({
            select: {
                id: true,
                nome: true,
                cnpj: true
            }
        });

        res.status(200).send(instituicoes);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const instituicao: IInstituicaoWithDates | null = await Instituicao.findFirst({
            where: { id: id }, 
            select: {
                id: true,
                cnpj: true,
                email: true,
                nome: true,
                created_at: true,
                updated_at: true,
                discentes: {
                    select: {
                        id: true,
                        email: true,
                        curso: true
                    }
                }
            }
        });

        if (instituicao) {
            return res.status(200).send(instituicao);
        }

        return res.status(404).json(`Instituicao not found. Id: ${id}`);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const instituicao: IInstituicao = req.body;

        if (await instituicaoNotExist(id)) {
            return res.status(404).json(`Instituicao not found. Id: ${id}`);
        }

        const instituicaoUpdated: IInstituicaoWithDates = await Instituicao.update({ 
            where: { id: id }, 
            data: instituicao,
            select: {
                id: true,
                cnpj: true,
                email: true,
                nome: true,
                created_at: true,
                updated_at: true,
            }
         });

        res.send(instituicaoUpdated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const instituicaoNotExist = async (id: string): Promise<boolean> => {
    const instituicaoToUpdate = await Instituicao.findFirst({ where: { id: id } });

    const exist = instituicaoToUpdate ? false : true;

    return exist;
}

const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (await instituicaoNotExist(id)) {
            return res.status(404).json(`Instituicao not found. Id: ${id}`);
        }

        await Instituicao.delete({ where: { id: id } });

        res.json(`Instituicao removed success! Id: ${id}`);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

export default {
    create,
    findAll,
    findById,
    update,
    remove
}