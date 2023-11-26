import { Router } from "express";
import InstituicaoController from "../../controller/InstituicaoController";

const instituicaoRoutes = Router();

instituicaoRoutes.post("/save", InstituicaoController.create);
instituicaoRoutes.get("/", InstituicaoController.findAll);
instituicaoRoutes.get("/:id", InstituicaoController.findById);

export default instituicaoRoutes;