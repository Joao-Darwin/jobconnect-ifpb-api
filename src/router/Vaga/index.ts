import { Router } from "express";
import VagaController from "../../controller/VagaController";
import { AuthMiddleware } from "../../middleware/auth";

const vagaRoutes = Router();

vagaRoutes.post("/save", AuthMiddleware, VagaController.create);
vagaRoutes.get("/", AuthMiddleware, VagaController.findAll);
vagaRoutes.get("/:id", AuthMiddleware, VagaController.findById);
vagaRoutes.put("/:id", AuthMiddleware, VagaController.update);
vagaRoutes.put("/:id/apply", AuthMiddleware, VagaController.applyVaga);
vagaRoutes.delete("/:id", AuthMiddleware, VagaController.remove);

export default vagaRoutes
