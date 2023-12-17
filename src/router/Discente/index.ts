import { Router } from "express";
import DiscenteController from "../../controller/DiscenteController";
import { AuthMiddleware } from "../../middleware/auth";

const discenteRoutes = Router();

discenteRoutes.post("/save", DiscenteController.create);
discenteRoutes.get("/", DiscenteController.findAll);
discenteRoutes.get("/:id", DiscenteController.findById);
discenteRoutes.get("/:id/vancancies", AuthMiddleware, DiscenteController.findVagasByDiscente);
discenteRoutes.put("/:id", DiscenteController.update);
discenteRoutes.delete("/:id", DiscenteController.remove);

export default discenteRoutes;