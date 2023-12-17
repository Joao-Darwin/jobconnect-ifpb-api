import { Router } from "express";
import DiscenteController from "../../controller/DiscenteController";
import { AuthMiddleware } from "../../middleware/auth";

const discenteRoutes = Router();

discenteRoutes.post("/save", DiscenteController.create);
discenteRoutes.get("/", AuthMiddleware, DiscenteController.findAll);
discenteRoutes.get("/:id", AuthMiddleware, DiscenteController.findById);
discenteRoutes.get("/:id/vancancies", AuthMiddleware, DiscenteController.findVagasByDiscente);
discenteRoutes.put("/:id", AuthMiddleware, DiscenteController.update);
discenteRoutes.delete("/:id", AuthMiddleware, DiscenteController.remove);

export default discenteRoutes;