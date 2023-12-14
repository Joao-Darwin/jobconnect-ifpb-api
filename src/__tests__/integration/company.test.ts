import supertest from "supertest";
import app from "../../app";

const baseUrl: string = "/api/v1/companies";
let idCompany: string;

describe("POST /companies/save", () => {
    it("Should create a Company and return data", async () => {
        const request = supertest(app);
        const companyToCreate = {
            "cnpj": "1170073000011",
            "nome": "AM3 Solucoes",
            "email": "contato@am3solucoes.com.br",
            "password": "12345",
            "telefone": "8335317368",
            "image": "",
            "latitude": -6.88717306489256,
            "longitude": -38.550515715343685
        }

        const response = await request.post(`${baseUrl}/save`).send(companyToCreate);

        expect(response.body.id).not.toBeNull();
        expect(response.statusCode).toBe(201);
        expect(response.body.email).toEqual("contato@am3solucoes.com.br");

        idCompany = response.body.id;
    })
})

describe("DELETE /companies/id", () => {
    it("Should remove a Company and return message", async () => {
        const request = supertest(app);

        const response = await request.delete(`${baseUrl}/${idCompany}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).not.toBeNull();
    })
})