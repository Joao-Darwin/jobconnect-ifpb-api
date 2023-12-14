import supertest from "supertest";
import app from "../../app";

jest.mock("bcrypt", () => ({
  hash: jest
    .fn()
    .mockImplementation(
      (arg) => "$2a$10$VMLj2QH/ilvDovqrqC8s4uybSYSaJxN64eyi8XHFwXG8aQstiJWl2"
    ),
}));

jest.mock("../../model/Vagas/index.ts", () => ({
  create: () => true,
  findById: () => true,
  update: () => true,
  delete: () => true,
  findMany: () => true,
  findFirst: () => true,
}));

describe("get all", () => {
  it("should get all registered vancancies", async () => {
    const response = await supertest(app).get("/api/v1/vancancies/");

    expect(response.statusCode).toEqual(200);
  });
});

describe("create", () => {
  it("should create a vacancy", async () => {
    const reqBody = {
      descricao: "string",
      perfilProfissional: "string",
      procedimento: "string",
      empresaId: "string",
    };

    const response = await supertest(app)
      .post("/api/v1/vancancies/save")
      .send(reqBody);

    expect(response.statusCode).toEqual(201);
  });
});

describe("get by ID", () => {
  it("should get vacancy data", async () => {
    const id = "eusouumID";

    const response = await supertest(app).get(`/api/v1/vancancies/${id}`);

    expect(response.statusCode).toEqual(200);
  });
});

describe("update", () => {
  it("should update the data of a vacancy", async () => {
    const id = "eusouumid";

    const reqBody = {
      descricao: "string",
      perfilProfissional: "string",
      procedimento: "string",
      empresaId: "string",
    };

    const response = await supertest(app)
      .put(`/api/v1/vancancies/${id}`)
      .send(reqBody);

    expect(response.statusCode).toEqual(200);
  });
});

describe("remove", () => {
  it("should remove vacancy", async() => {
    const id = "asadsda";
    const reqBody = {
      discenteId: "asadasdsad",
    };

    const response = await supertest(app).delete(`/api/v1/vancancies/${id}`).send(reqBody);

    expect(response.statusCode).toEqual(200);
  });
});
