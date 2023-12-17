import { Router } from "express";
import EmpresaController from "../../controller/EmpresaController";
import { AuthMiddleware } from "../../middleware/auth";

const empresaRoutes = Router();

empresaRoutes.post("/save", EmpresaController.create);
empresaRoutes.get("/", AuthMiddleware, EmpresaController.findAll);
empresaRoutes.get("/:id", AuthMiddleware, EmpresaController.findById);
empresaRoutes.get("/:id/vancancies", AuthMiddleware, EmpresaController.findVagasByEmpresa);
empresaRoutes.put("/:id", AuthMiddleware, EmpresaController.update);
empresaRoutes.delete("/:id", AuthMiddleware, EmpresaController.remove);

export default empresaRoutes;