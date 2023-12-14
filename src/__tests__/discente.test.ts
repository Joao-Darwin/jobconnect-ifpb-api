import DiscenteController from "../controller/DiscenteController";
import IDiscente from "../interfaces/Discente/IDiscente";
import IDiscenteDTO from "../interfaces/Discente/DTOs/IDiscenteDTO";
import bcryptjs from "bcrypt";
import request from "supertest";
import discenteRoutes from "../router/Discente";

jest.mock("bcrypt");

describe("create", () => {
  const reqBody: IDiscente = {
    matricula: "string",
    telefone: "string",
    email: "string",
    curso: "string",
    avatar: "string",
    instituicaoId: "string",
  };

  const expRes: IDiscenteDTO = {
    id: "aodoasdo",
    matricula: reqBody.matricula,
    email: reqBody.email,
    curso: reqBody.curso,
  };

  jest.mock("../model/Discente/index.ts", () => {
    create: jest.fn().mockImplementation(arg => expRes)
  });

  jest.mock("bcrypt", () => {
    genSalt: "asdadsaf";
    hash: "asdasdasd";
  });

  it("should create a student", async() => {
    await request(discenteRoutes).post('/save').send(reqBody).expect(201).expect(expRes);
  });
});

describe("get infos", () => {
  it("should get student data", async() => {
  });
});

describe("remove candidacy", () => {
  it("should remove student candidacy in a vancancy", async() => {
  });
});

describe("remove interest in a vacancy", () => {
  it("should remove student interest in a vacancy", async() => {
  });
});

describe("update student", () => {
  it("should update student data", async() => {
  });
});

describe("remove curriculum", () => {
  it("should remove student curriculum", async() => {
  });
});

describe("get vacancies of interest to the student", () => {
  it("should get vacancies of interest to the student", async() => {
  });
});

describe("demonstrate interest in a vacancy", () => {
  it("should demonstrate a student interest in a vacancy", async() => {
  });
});

describe("vacancy recommendation", () => {
  it("should return vacancy recommendation", async() => {
  });
});

describe("applying for vacancies", () => {
  it("should register a user application for a vacancy", async() => {
  });
});