import { Request, Response } from "express";
import Logger from "../../../config/logger";
import IEmpresaDTO from "../../interfaces/Empresa/DTOs/IEmpresaDTO";
import IEmpresa from "../../interfaces/Empresa/IEmpresa";
import Empresa from "../../model/Empresa";
import { createHashPassword } from "../../util/bcrypt";
import EmailSchema from "../../util/validations/formatEmailValidation";

interface IEmpresaWithPassword extends IEmpresa {
    password: string
};

const create = async (req: Request, res: Response) => {
    try {
        const empresa: IEmpresaWithPassword = req.body;

        const resultValidation = EmailSchema.safeParse(empresa.email);

        if (!resultValidation.success) {
            return res.status(400).send({
                "message": "the field 'email' is invalid"
            });
        }
        
        const imagePath = req?.file?.path ?? "";

        empresa.password = await createHashPassword(empresa.password);

        const empresaCreated: IEmpresa = await Empresa.create({
            data: {
                ...empresa,
                image: imagePath,
                latitude: typeof(empresa.latitude) == "string" ? parseFloat(empresa.latitude) : empresa.latitude,
                longitude: typeof(empresa.longitude) == "string" ? parseFloat(empresa.longitude) : empresa.longitude
            },
            select: {
                id: true,
                cnpj: true,
                nome: true,
                email: true,
                image: true,
                telefone: true,
                latitude: true,
                longitude: true
            }
        });

        res.status(201).send(empresaCreated);
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

const findById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const empresa = await Empresa.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                cnpj: true,
                nome: true,
                email: true,
                telefone: true,
                image: true,
                latitude: true,
                longitude: true,
                vagas: {
                    select: {
                        _count: true
                    }
                }
            }
        })

        if (empresa) {
            return res.send(empresa);
        }

        return res.status(404).send({
            "message": `Company not found. Id: ${id}`
        });
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const findVagasByEmpresa = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (await companyNotExist(id)) {
            return res.status(404).json({
                messageError: `Company not found. Id: ${id}`
            });
        }

        const vagasFromEmpresa = await Empresa.findFirst({
            where: {
                id: id
            },
            select: {
                vagas: {
                    select: {
                        id: true,
                        perfilProfissional: true,
                        descricao: true,
                        procedimento: true,
                    }
                }
            }
        })

        res.send(vagasFromEmpresa);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const imagePath = req?.file?.path ?? null;

        if (await companyNotExist(id)) {
            return res.status(400).json({
                "message": `Company not found. Id: ${id}`
            });
        }

        let companyToUpdate: IEmpresa = req.body;
        if(imagePath) companyToUpdate.image = imagePath;

        const companyUpdated = await Empresa.update({
            where: {
                id: id
            },
            data: companyToUpdate,
            select: {
                id: true,
                cnpj: true,
                nome: true,
                email: true,
                telefone: true,
                image: true
            }
        })

        return res.send(companyUpdated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const companyNotExist = async (id: string): Promise<boolean> => {
    const companyToUpdate = await Empresa.findFirst({ where: { id: id } });

    return companyToUpdate ? false : true;
}

const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (await companyNotExist(id)) {
            return res.status(400).json({
                "message": `Company not found. Id: ${id}`
            });
        }

        const wasDeleted = await Empresa.delete({
            where: {
                id: id
            }
        });

        if(wasDeleted) {
            return res.status(200).json(`Company deleted with success. Id: ${id}`);
        }
        return res.status(500).json("there was an error trying to remove the company");
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

export default {
    create,
    findAll,
    findById,
    findVagasByEmpresa,
    update,
    remove
}