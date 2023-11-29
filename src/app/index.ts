import cors from "cors";
import express from "express";
import instituicaoRoutes from "../router/Instituicao";
import discenteRoutes from "../router/Discente";
import empresaRoutes from "../router/Empresa";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/institutions", instituicaoRoutes);
app.use("/api/v1/students", discenteRoutes);
app.use("/api/v1/companies", empresaRoutes);

export default app;