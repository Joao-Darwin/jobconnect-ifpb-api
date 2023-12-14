import DiscenteController from "../controller/DiscenteController";
import IDiscente from "../interfaces/Discente/IDiscente";
import IDiscenteDTO from "../interfaces/Discente/DTOs/IDiscenteDTO";
import Discente from "../model/Discente/index.ts";

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


  it("should create a student", async() => {
  });
});

describe("get infos", () => {
  it("should get student data", async() => {
  });
});

describe("remove candidacy", async() => {
  it("should remove student candidacy in a vancancy", () => {
    
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
