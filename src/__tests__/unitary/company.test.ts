import supertest from "supertest";
import app from "../../app";
import IEmpresa from "../../interfaces/Empresa/IEmpresa";

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockImplementation(arg => "$2a$10$VMLj2QH/ilvDovqrqC8s4uybSYSaJxN64eyi8XHFwXG8aQstiJWl2")
}));

jest.mock("../../model/Empresa/index.ts", () => ({
  create: () => true,
  findById: () => true,
  update: () => true,
  delete: () => true,
  findMany: () => true,
  findFirst: () => true,
}));

const reqBody: IEmpresa = {
  cnpj: "string",
  nome: "string",
  email: "string",
  telefone: "string",
  image: "string",
  latitude: 0,
  longitude: 0
};

describe("create", () => {
  it("should create a company", async() => {
    const response = await supertest(app).post('/api/v1/companies/save').send({...reqBody, password: "asdsdsdas"});

    expect(response.statusCode).toEqual(201);
  });
});

describe("update", () => {
  it("should update company data", async() => {
    const id = "asadsda";
    const response = await supertest(app).put(`/api/v1/companies/${id}`).send(reqBody);
    expect(response.statusCode).toEqual(200);
  });
});

describe("get all companies", () => {
  it("should get company data", async() => {
    const response = await supertest(app).get(`/api/v1/companies`);
    expect(response.statusCode).toEqual(200);
  });
});

describe("get vacancies", () => {
  it("should get company vacancies", async() => {
    const id = "oieusouumid";
    const response = await supertest(app).get(`/api/v1/companies/${id}/vancancies`);
    expect(response.statusCode).toEqual(200);
  });
});

describe("get data", () => {
  it("shoud get company infos", async() => {
    const id = "asdasdas";
    const response = await supertest(app).get(`/api/v1/companies/${id}`);
    expect(response.statusCode).toEqual(200);
  });
});

describe("remove company", () => {
  it("should remove company", async() => {
    const id = "asadsda";

    const response = await supertest(app).delete(`/api/v1/companies/${id}`);

    expect(response.statusCode).toEqual(200);
  });
});
