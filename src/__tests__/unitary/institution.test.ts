import supertest from "supertest";
import app from "../../app";
import IInstituicao from "../../interfaces/Instituicao/IInstituicao";

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockImplementation(arg => "$2a$10$VMLj2QH/ilvDovqrqC8s4uybSYSaJxN64eyi8XHFwXG8aQstiJWl2")
}));

jest.mock("../../model/Instituicao/index.ts", () => ({
  create: () => true,
  findById: () => true,
  update: () => true,
  delete: () => true,
  findMany: () => true,
  findFirst: () => true,
}));

const reqBody: IInstituicao = {
  id: "string",
  cnpj: "string",
  email: "string",
  nome: "string"
};

describe("create", () => {
  it("should create a institution", async() => {
    const response = await supertest(app).post('/api/v1/institutions/save').send(reqBody);
    expect(response.statusCode).toEqual(201);
  });
});

describe("update", () => {
  it("should update a institution", async() => {
    const id = "asadsda";
    const response = await supertest(app).put(`/api/v1/institutions/${id}`).send(reqBody);
    expect(response.statusCode).toEqual(200);
  });
});

describe("get all", () => {
  it("should get all institutions", async() => {
    const response = await supertest(app).get(`/api/v1/institutions`);
    expect(response.statusCode).toEqual(200);
  });
});

describe("get data", () => {
  it("shoud get institution data", async() => {
    const id = "asdasdas";
    const response = await supertest(app).get(`/api/v1/institutions/${id}`);
    expect(response.statusCode).toEqual(200);
  });
});

describe("remove institution", () => {
  it("should remove institution", async() => {
    const id = "asadsda";
    const response = await supertest(app).delete(`/api/v1/institutions/${id}`);
    expect(response.statusCode).toEqual(200);
  });
});
