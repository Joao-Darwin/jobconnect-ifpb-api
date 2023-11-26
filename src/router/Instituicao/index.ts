import { Router } from "express";
import InstituicaoController from "../../controller/InstituicaoController";

const instituicaoRoutes = Router();

instituicaoRoutes.post("/save", InstituicaoController.create);
instituicaoRoutes.get("/", InstituicaoController.findAll);
instituicaoRoutes.get("/:id", InstituicaoController.findById);
instituicaoRoutes.put("/:id", InstituicaoController.update);
instituicaoRoutes.delete("/:id", InstituicaoController.remove);

export default instituicaoRoutes;