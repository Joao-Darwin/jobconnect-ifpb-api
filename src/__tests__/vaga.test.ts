import app from "../app";
import VagaController from "../controller/VagaController";
import supertest, { Request } from "supertest";
import IVaga from "../interfaces/Vaga/IVaga";

describe("get all", () => {
  it("should get all registered vacancies", async () => {
  });
});

describe("create", () => {
  it("should create a vacancy", async () => {
  });
});

describe("get by ID", () => {
  it("should get vacancy data", async () => {
  });

  it("should try to get a vacancy data with a invalid ID", async () => {
  });
});

describe("update", () => {
  it("should update the data of a vacancy", async () => {
  });
});

let idVancancieCreated: string;

describe("POST /vancancies/save", () => {
  it("shold return 201 and vancancie created", async () => {
    const request = supertest(app);
    const vacancieToSave: IVaga = {
      "descricao": "Estágio remunerado, de 7h às 12h",
      "perfilProfissional": "Estagio FullStack",
      "procedimento": "Entrar em contato com a empresa para saber mais",
      "empresaId": "56b51a8f-9c14-4582-8d1e-e12704c5f5dd"
    }

    const response = await request.post("/api/v1/vancancies/save").send(vacancieToSave);

    expect(response.statusCode).toEqual(201);
    expect(response.body.id).not.toBeNull();

    idVancancieCreated = response.body.id;
  })
})

describe("PUT /vancancies/id/apply", () => {
  it("shold return 200 and message with success", async () => {
    const request = supertest(app);
    const bodyTest = {
      "discenteId": "9b9ee62f-e63c-4b51-96c4-6504f889a4c2"
    }

    const response = await request.put(`/api/v1/vancancies/${idVancancieCreated}/apply`).send(bodyTest);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).not.toBeNull();
  })
})

describe("DELETE /vancancies", () => {
  it("shold return 200 and message vancancie deleted", async () => {
    const request = supertest(app);

    const response = await request.delete(`/api/v1/vancancies/${idVancancieCreated}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).not.toBeNull();
  })
})