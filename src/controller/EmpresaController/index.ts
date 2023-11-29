import { Request, Response } from "express";
import Logger from "../../../config/logger";
import IEmpresa from "../../interfaces/Empresa/IEmpresa";
import Empresa from "../../model/Empresa";
import { createHashPassword } from "../../util/bcrypt";
import IEmpresaDTO from "../../interfaces/Empresa/DTOs/IEmpresaDTO";

interface IEmpresaWithPassword extends IEmpresa {
    password: string
}

const create = async (req: Request, res: Response) => {
    try {
        const empresa: IEmpresaWithPassword = req.body;

        empresa.password = await createHashPassword(empresa.password);

        const empresaCreated: IEmpresa = await Empresa.create({
            data: empresa,
            select: {
                id: true,
                cnpj: true,
                nome: true,
                email: true,
                telefone: true,
                image: true
            }
        });

        res.send(empresaCreated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const findAll = async (req: Request, res: Response) => {
    try {
        const empresas: IEmpresaDTO[] = await Empresa.findMany({
            select: {
                id: true,
                cnpj: true,
                nome: true,
                email: true,
                vagas: {
                    select: {
                        _count: true
                    }
                }
            }
        });

        res.send(empresas);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

export default {
    create,
    findAll
}