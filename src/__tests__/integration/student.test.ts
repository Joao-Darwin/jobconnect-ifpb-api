import supertest from "supertest"
import app from "../../app"

describe("GET /students", () => {
    it("should return 200 code and vancancies from student", async () => {
        const request = supertest(app);

        const response = await request.get("/api/v1/students/9b9ee62f-e63c-4b51-96c4-6504f889a4c2/vancancies");

        expect(response.statusCode).toEqual(200);
        expect(response.body).not.toBeNull();
    })
})