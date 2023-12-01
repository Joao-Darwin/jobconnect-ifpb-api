import { Router } from "express";
import VagaController from "../../controller/VagaController";

const vagaRoutes = Router();

vagaRoutes.post("/save", VagaController.create);
vagaRoutes.get("/", VagaController.findAll);
vagaRoutes.get("/:id", VagaController.findById);
vagaRoutes.put("/:id", VagaController.update);
vagaRoutes.put("/:id/apply", VagaController.applyVaga);
vagaRoutes.delete("/:id", VagaController.remove);

export default vagaRoutes