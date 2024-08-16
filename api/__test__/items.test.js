const supertest = require('supertest');
const server = require ('../../server');
const prisma = require ('../../db/index');
const bcrypt = require ("bcrypt");

describe('/routes/items', () => {

    describe("GET /", () => {
        beforeEach(() => {
            prisma.items.create = jest.fn().mockResolvedValue({
                id: "123",
                name: "test",
                description: "Test description",
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        test("returns all items when successful", async () => {
            const res = await supertest(server).get("/routes/items/").send({
                
            })
        })
    });
})