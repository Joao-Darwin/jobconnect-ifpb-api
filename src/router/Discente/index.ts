import { Router } from "express";
import multer from "multer";
import { storage } from "../../config/upload";
import DiscenteController from "../../controller/DiscenteController";
import { AuthMiddleware } from "../../middleware/auth";

const discenteRoutes = Router();

const upload = multer({ storage });

discenteRoutes.post("/save", upload.fields([{name: "avatar"}, {name: "curriculo"}]), DiscenteController.create);
discenteRoutes.get("/", AuthMiddleware, DiscenteController.findAll);
discenteRoutes.get("/:id", AuthMiddleware, DiscenteController.findById);
discenteRoutes.get("/:id/vancancies", AuthMiddleware, DiscenteController.findVagasByDiscente);
discenteRoutes.put("/:id", AuthMiddleware, upload.fields([{name: "avatar"}, {name: "curriculo"}]), DiscenteController.update);
discenteRoutes.delete("/:id", AuthMiddleware, DiscenteController.remove);

export default discenteRoutes;
