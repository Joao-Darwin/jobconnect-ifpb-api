import cors from "cors";
import express from "express";
import instituicaoRoutes from "../router/Instituicao";
import discenteRoutes from "../router/Discente";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/institutions", instituicaoRoutes);
app.use("/api/v1/students", discenteRoutes);

export default app;