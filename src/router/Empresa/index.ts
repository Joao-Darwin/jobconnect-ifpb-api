import { Router } from "express";
import multer from "multer";
import { storage } from "../../config/upload";
import EmpresaController from "../../controller/EmpresaController";
import { AuthMiddleware } from "../../middleware/auth";

const empresaRoutes = Router();

const upload = multer({ storage });

empresaRoutes.post("/save", upload.single("image"), EmpresaController.create);
empresaRoutes.get("/", AuthMiddleware, EmpresaController.findAll);
empresaRoutes.get("/:id", AuthMiddleware, EmpresaController.findById);
empresaRoutes.get("/:id/vancancies", AuthMiddleware, EmpresaController.findVagasByEmpresa);
empresaRoutes.put("/:id", AuthMiddleware, EmpresaController.update);
empresaRoutes.delete("/:id", AuthMiddleware, EmpresaController.remove);

export default empresaRoutes;