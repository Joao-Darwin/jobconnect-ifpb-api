import supertest from "supertest";
import app from "../../app";

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockImplementation(arg => "$2a$10$VMLj2QH/ilvDovqrqC8s4uybSYSaJxN64eyi8XHFwXG8aQstiJWl2")
}));

jest.mock("../../model/Discente/index.ts", () => ({
  create: () => {},
  findById: () => {},
  update: () => {},
  delete: () => {},
  findFirst: () => true,
}));

describe("create", () => {
  it("should create a student", async() => {
    const reqBody = {
      matricula: "string",
      telefone: "string",
      email: "string",
      curso: "string",
      avatar: "string",
      instituicaoId: "asdassad",
      password: "sadasdasdsaasdsd"
    };

    const response = await supertest(app).post('/api/v1/students/save').send(reqBody);

    expect(response.statusCode).toEqual(201);
  });
});

describe("get infos", () => {
  it("should get student data", async() => {
    const id = "asdasdas";
    const response = await supertest(app).get(`/api/v1/students/${id}`);
    expect(response.statusCode).toEqual(200);
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
    const id = "asadsda";
    const reqBody = {
      matricula: "string",
      telefone: "string",
      email: "string",
      curso: "string",
      avatar: "string",
      instituicaoId: "asdassad",
    };

    const response = await supertest(app).put(`/api/v1/students/${id}`).send(reqBody);

    expect(response.statusCode).toEqual(200);
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
