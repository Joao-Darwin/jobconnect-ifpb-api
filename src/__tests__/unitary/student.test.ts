import DiscenteController from "../../controller/DiscenteController";
import IDiscente from "../../interfaces/Discente/IDiscente";
import IDiscenteDTO from "../../interfaces/Discente/DTOs/IDiscenteDTO";
import bcryptjs from "bcrypt";
import supertest from "supertest";
import app from "../../app";

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockImplementation(arg => "$2a$10$VMLj2QH/ilvDovqrqC8s4uybSYSaJxN64eyi8XHFwXG8aQstiJWl2")
}));

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

jest.mock("../../model/Discente/index.ts", () => ({
  create: () => expRes,
}));

describe("create", () => {
  it("should create a student", async() => {
    const data = {
      matricula: "string",
      telefone: "string",
      email: "string",
      curso: "string",
      avatar: "string",
      instituicaoId: "asdassad",
      password: "sadasdasdsaasdsd"
    };

    const response = await supertest(app).post('/api/v1/students/save').send(data);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(expRes);
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
