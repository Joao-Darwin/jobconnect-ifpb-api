import cors from "cors";
import express from "express";
import instituicaoRoutes from "../router/Instituicao";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/institutions", instituicaoRoutes);

export default app;