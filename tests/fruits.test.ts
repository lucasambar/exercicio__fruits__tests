import { app } from "../src/index";
import supertest from "supertest";

const api = supertest(app);

describe("testing fruits entity", () => {
    it('testing post without body', async () => {
        const result = await api.post("/fruits")
        expect (result.statusCode).toBe(422)
    })

    it('testing post without name', async () => {
        const body = {price: 100}
        const result = await api.post("/fruits").send(body)
        expect (result.statusCode).toBe(422)
    })

    it('testing post without price', async () => {
        const body = {name: "Banana"}
        const result = await api.post("/fruits").send(body)
        expect (result.statusCode).toBe(422)
    })

    it('testing post without wrong types', async () => {
        const body = {name: 100, price: "Banana"}
        const result = await api.post("/fruits").send(body)
        expect (result.statusCode).toBe(422)
    })

    it('testing post correctly', async () => {
        const body = {name: "Banana", price: 100}
        const result = await api.post("/fruits").send(body)
        expect (result.statusCode).toBe(201)
    })

    it('Testing get without id', async () => {
        const result = await api.get("/fruits")
        expect(result.statusCode).toBe(200)
        if (result.body.length === 0) expect(result.body).toEqual([])
        else expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    })

    it('Testing get with a wrong id', async () => {
        const result = await api.get("/fruits/100")
        expect(result.statusCode).toBe(404)
    })

    it('Testing get with a correct id', async () => {
        const result = await api.get("/fruits/1")
        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual({
            "id": 1,
            "name": "Banana",
            "price": 100
        })
    })
});
