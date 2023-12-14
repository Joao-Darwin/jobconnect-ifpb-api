import supertest from "supertest"
import app from "../../app"

const baseUrl: string = "/api/v1/institutions";
let idInstitution: string;

describe("POST /institutions/save", () => {
    it("Should create a institution and return data", async () => {
        const request = supertest(app);
        const institutionToCreate = {
            "cnpj": "10783898000508",
            "email": "campus_cajazeiras@ifpb.edu.br",
            "password": "12345",
            "nome": "IFPB - Cajazeiras"
        }

        const response = await request.post(`${baseUrl}/save`).send(institutionToCreate);

        expect(response.body.id).not.toBeNull();
        expect(response.statusCode).toBe(201);
        expect(response.body.email).toEqual("campus_cajazeiras@ifpb.edu.br");

        idInstitution = response.body.id;
    })
})

describe("PUT /institutions/id", () => {
    it("Should update a institution's data and return data", async () => {
        const request = supertest(app);
        const institutionToEdit = {
            "cnpj": "10783898000509",
            "nome": "IFPB - CZ"
        }

        const response = await request.put(`${baseUrl}/${idInstitution}`).send(institutionToEdit);

        expect(response.body.id).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body.cnpj).toEqual("10783898000509");
        expect(response.body.nome).toEqual("IFPB - CZ");
    })
})

describe("DELETE /institutions/id", () => {
    it("Should remove a institution and return message", async () => {
        const request = supertest(app);

        const response = await request.delete(`${baseUrl}/${idInstitution}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).not.toBeNull();
    })
})