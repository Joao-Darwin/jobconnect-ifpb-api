import { Request, Response } from "express";
import Logger from "../../../config/logger";
import IEmpresa from "../../interfaces/Empresa/IEmpresa";
import Empresa from "../../model/Empresa";
import { createHashPassword } from "../../util/bcrypt";

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

export default {
    create
}