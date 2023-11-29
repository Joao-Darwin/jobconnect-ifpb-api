import { Router } from "express";
import EmpresaController from "../../controller/EmpresaController";

const empresaRoutes = Router();

empresaRoutes.post("/save", EmpresaController.create);

export default empresaRoutes;