import { Router } from "express";
import InstituicaoController from "../../controller/InstituicaoController";

const instituicaoRoutes = Router();

instituicaoRoutes.post("/save", InstituicaoController.create);

export default instituicaoRoutes;