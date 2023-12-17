import cors from "cors";
import express from "express";
import instituicaoRoutes from "../router/Instituicao";
import discenteRoutes from "../router/Discente";
import empresaRoutes from "../router/Empresa";
import vagaRoutes from "../router/Vaga";
import authenticationRoutes from "../router/Authentication";

const app = express();

app.use(express.json());
app.use(cors());

const basePathUrlApiV1 = "/api/v1";

app.use(`${basePathUrlApiV1}`, authenticationRoutes);
app.use(`${basePathUrlApiV1}/institutions`, instituicaoRoutes);
app.use(`${basePathUrlApiV1}/students`, discenteRoutes);
app.use(`${basePathUrlApiV1}/companies`, empresaRoutes);
app.use(`${basePathUrlApiV1}/vancancies`, vagaRoutes);

export default app;