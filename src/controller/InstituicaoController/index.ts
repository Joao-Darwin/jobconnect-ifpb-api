import { Request, Response } from "express";
import Logger from "../../../config/logger";
import IInstituicao from "../../interfaces/Instituicao/IInstituicao";
import Instituicao from "../../model/Instituicao";
import IInstituicaoWithDates from "../../interfaces/Instituicao/IInstituicaoWithDates";

const create = async (req: Request, res: Response) => {
    try {
        const instituicao: IInstituicao = req.body;

        const instituicaoCreated: IInstituicaoWithDates = await Instituicao.create({
            data: {
                nome: instituicao.nome,
                cnpj: instituicao.cnpj,
            }
        });

        res.status(200).send(instituicaoCreated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).send(error.message);
    }
}

export default {
    create
}