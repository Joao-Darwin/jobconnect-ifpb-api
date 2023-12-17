import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import Logger from "../../config/logger";
import Discente from "../model/Discente";
import Empresa from "../model/Empresa";
import Instituicao from "../model/Instituicao";
import { compareHashWithTextPassword } from "../util/bcrypt";

const authentication = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await verifyUserExist(email);

        if (!user) {
            return res.status(403).send({
                "message": "Invalid credentials, please try again"
            })
        }

        const passwordIsCurrent = await compareHashWithTextPassword(password, user.password);

        if (!passwordIsCurrent) {
            return res.status(403).send({
                "message": "Invalid credentials, please try again"
            })
        }

        const keySecret = process.env.KEY_SECRET || "secret";

        const token = sign({
            id: user.id
        }, keySecret, {expiresIn: "24h"});

        return res.send({
            userId: user.id,
            token
        })
    } catch (error: any) {
        Logger.error(error.message);
        return res.status(500).send(error.message);
    }
}

const verifyUserExist = async (email: string) => {
    let discente = await Discente.findUnique({
        where: {
            email: email
        }
    })

    if (discente) {
        return discente;
    }

    let empresa = await Empresa.findUnique({
        where: {
            email: email
        }
    })

    if (empresa) {
        return empresa;
    }

    let instituicao = await Instituicao.findUnique({
        where: {
            email: email
        }
    })

    return instituicao;
}

export default {
    authentication
};