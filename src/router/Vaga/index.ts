import { Router } from "express";
import VagaController from "../../controller/VagaController";

const vagaRoutes = Router();

vagaRoutes.post("/save", VagaController.create);
vagaRoutes.get("/", VagaController.findAll);
vagaRoutes.get("/:id", VagaController.findById);
vagaRoutes.put("/:id", VagaController.update);

export default vagaRoutes