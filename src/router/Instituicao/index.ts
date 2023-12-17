import { Router } from "express";
import InstituicaoController from "../../controller/InstituicaoController";
import { AuthMiddleware } from "../../middleware/auth";

const instituicaoRoutes = Router();

instituicaoRoutes.post("/save", InstituicaoController.create);
instituicaoRoutes.get("/", AuthMiddleware, InstituicaoController.findAll);
instituicaoRoutes.get("/:id", AuthMiddleware, InstituicaoController.findById);
instituicaoRoutes.put("/:id", AuthMiddleware, InstituicaoController.update);
instituicaoRoutes.delete("/:id", AuthMiddleware, InstituicaoController.remove);

export default instituicaoRoutes;