import { Router } from "express";
import VagaController from "../../controller/VagaController";

const vagaRoutes = Router();

vagaRoutes.post("/save", VagaController.create);

export default vagaRoutes