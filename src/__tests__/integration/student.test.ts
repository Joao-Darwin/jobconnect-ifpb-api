import supertest from "supertest"
import app from "../../app"
import IDiscente from "../../interfaces/Discente/IDiscente";

let idStudentCreated: string;

describe("POST /students/save", () => {
    it("shold return 201 and student created", async () => {
        const request = supertest(app);

        const studentToSave: IDiscente = {
            matricula: "string",
            telefone: "string",
            email: "string",
            curso: "string",
            avatar: "string",
            instituicaoId: "string",
        };

        const response = await request.post("/api/v1/students/save").send(studentToSave);

        expect(response.statusCode).toEqual(201);
        expect(response.body.id).not.toBeNull();

        idStudentCreated = response.body.id;
    })
})

describe("GET /students", () => {
    it("should return 200 code and vancancies from student", async () => {
        const request = supertest(app);

        const response = await request.get(`/api/v1/students/${idStudentCreated}/vancancies`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).not.toBeNull();
    })
})

describe("DELETE /students", () => {
    it("shold return 200 and message students deleted", async () => {
        const request = supertest(app);

        const response = await request.delete(`/api/v1/students/${idStudentCreated}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.message).not.toBeNull();
    })
})
