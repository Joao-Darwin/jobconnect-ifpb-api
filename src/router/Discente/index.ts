import { Router } from "express";
import DiscenteController from "../../controller/DiscenteController";

const discenteRoutes = Router();

discenteRoutes.post("/save", DiscenteController.create);

export default discenteRoutes;