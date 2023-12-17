import { Router } from "express";
import AuthenticationController from "../../controller/AuthenticationController";

const authenticationRoutes = Router();

authenticationRoutes.post("/login", AuthenticationController.authentication);

export default authenticationRoutes;