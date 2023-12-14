import supertest from "supertest";
import app from "../../app";
import IDiscente from "../../interfaces/Discente/IDiscente";

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockImplementation(arg => "$2a$10$VMLj2QH/ilvDovqrqC8s4uybSYSaJxN64eyi8XHFwXG8aQstiJWl2")
}));

jest.mock("../../model/Discente/index.ts", () => ({
  create: () => true,
  findById: () => true,
  update: () => true,
  delete: () => true,
  findMany: () => true,
  findFirst: () => true,
}));

const reqBody: IDiscente = {
  matricula: "string",
  telefone: "string",
  email: "string",
  curso: "string",
  avatar: "string",
  instituicaoId: "asdassad",
};

describe("create", () => {
  it("should create a student", async() => {
    const response = await supertest(app).post('/api/v1/students/save').send({ ...reqBody, password: "sadasdasdsaasdsd" });

    expect(response.statusCode).toEqual(201);
  });
});

describe("get data", () => {
  it("should get student data", async() => {
    const id = "asdasdas";
    const response = await supertest(app).get(`/api/v1/students/${id}`);
    expect(response.statusCode).toEqual(200);
  });
});

describe("get all students", () => {
  it("should get student data", async() => {
    const response = await supertest(app).get(`/api/v1/students`);
    expect(response.statusCode).toEqual(200);
  });
});

describe("update student", () => {
  it("should update student data", async() => {
    const id = "asadsda";

    const response = await supertest(app).put(`/api/v1/students/${id}`).send(reqBody);

    expect(response.statusCode).toEqual(200);
  });
});

describe("remove student", () => {
  it("should remove student", async() => {
    const id = "asadsda";

    const response = await supertest(app).delete(`/api/v1/students/${id}`);

    expect(response.statusCode).toEqual(200);
  });
});

describe("get student applications", () => {
  it("should get student applications", async() => {
    const id = "asadsda";

    const response = await supertest(app).get(`/api/v1/students/${id}/vancancies`);

    expect(response.statusCode).toEqual(200);
  });
});
