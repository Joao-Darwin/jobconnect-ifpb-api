import { Request, Response } from "express";
import Logger from "../../../config/logger";
import IDiscente from "../../interfaces/Discente/IDiscente";
import IDiscenteDTO from "../../interfaces/Discente/DTOs/IDiscenteDTO";
import Discente from "../../model/Discente";
import { createHashPassword } from "../../util/bcrypt";
import { Multer } from "multer";

interface IDiscenteWithPassword extends IDiscente {
    password: string;
};

const create = async (req: Request, res: Response) => {
    try {
        const discenteData: IDiscenteWithPassword = req.body;
        const images: any = req?.files;
        const avatarPath = images.avatar[0].path, curriculoPath = images.curriculo[0].path;

        discenteData.password = await createHashPassword(discenteData.password);

        const discenteCreated: IDiscenteDTO = await Discente.create({
            data: {
                ...discenteData,
                avatar: avatarPath,
                curriculo: curriculoPath,
            },
            select: {
                id: true,
                matricula: true,
                email: true,
                avatar: true,
                curriculo: true,
                curso: true,
                created_at: true,
                updated_at: true,
            }
        });

        res.status(201).send(discenteCreated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const findAll = async (req: Request, res: Response) => {
    try {
        const discentes: IDiscenteDTO[] = await Discente.findMany({
            select: {
                id: true,
                email: true,
                matricula: true,
                curso: true
            }
        });

        res.send(discentes);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const discente = await Discente.findFirst({
            where: { id: id },
            select: {
                id: true,
                matricula: true,
                telefone: true,
                email: true,
                curso: true,
                avatar: true,
                curriculo: true,
                created_at: true,
                updated_at: true,
                Instituicao: {
                    select: {
                        id: true
                    }
                }
            }
        });

        res.send(discente);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const findVagasByDiscente = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id;

        if (await discenteNotExist(studentId)) {
            return res.status(404).json({
                "message": `Student not found. Id: ${studentId}`
            });
        }

        const vagas = await Discente.findFirst({
            where: {
                id: studentId
            },
            select: {
                vagas: {
                    select: {
                        id: true,
                        perfilProfissional: true,
                        descricao: true,
                        procedimento: true,
                        empresa: {
                            select: {
                                id: true,
                                nome: true
                            }
                        }
                    }
                }
            }
        })

        res.send(vagas);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const images: any = req?.files;
        const avatarPath = images.avatar[0].path, curriculoPath = images.curriculo[0].path;

        if (await discenteNotExist(id)) {
            return res.status(400).json({
                "message": `Student not found. Id: ${id}`
            });
        }

        const discenteToUpdate: IDiscente = req.body;
        if(avatarPath) discenteToUpdate.avatar = avatarPath;
        if(curriculoPath) discenteToUpdate.curriculo = curriculoPath;

        const discenteUpdated = await Discente.update({
            where: { id: id },
            data: discenteToUpdate,
            select: {
                id: true,
                matricula: true,
                telefone: true,
                email: true,
                curso: true,
                avatar: true,
                curriculo: true,
                created_at: true,
                updated_at: true,
                Instituicao: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return res.send(discenteUpdated);
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

const discenteNotExist = async (id: string): Promise<boolean> => {
    const discenteToUpdate = await Discente.findFirst({ where: { id: id } });

    return discenteToUpdate ? false : true;
}

const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (await discenteNotExist(id)) {
            return res.status(400).json({
                "message": `Student not found. Id: ${id}`
            });
        }

        await Discente.delete({ where: { id: id } });

        res.json({
            "message": `Student removed success! Id: ${id}`
        });
    } catch (error: any) {
        Logger.error(error.message);
        res.status(500).json(error.message);
    }
}

export default {
    create,
    findAll,
    findById,
    findVagasByDiscente,
    update,
    remove
}