const supertest = require('supertest');
const server = require('../../../server');
const prisma = require('../../../db/index');
const bcrypt = require("bcrypt");

describe('/routes/auth', () => {

    describe("POST /register", () => {
        beforeEach(() => {
            prisma.users.create = jest.fn().mockResolvedValue({
                id: "123",
                username: "test",
                password: "hashPass",
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        test("returns 201 status code when successful", async () => {
            const res = await supertest(server).post("/routes/auth/register").send({
                username: "test1",
                password: "somePass",
            });
            
            expect(res.status).toBe(201);
        });

        test("returns a token when  successful", async () => {
            const res = await supertest(server).post("/routes/auth/register").send({
                username: "test2",
                password: "somePass",
            });

            expect(res.body.token).toBeTruthy();
        });
    });

    describe("POST /login", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        test("returns 200 when successful", async () => {
            prisma.users.findUnique = jest.fn().mockResolvedValue({
                id: "123",
                username: "test",
                password: "hashPass",
            });

            bcrypt.compare = jest.fn().mockResolvedValue(true);

            const res = await supertest(server).post("/routes/auth/login").send({
                username: "test",
                password: "hashPass",
            });

            expect(res.status).toBe(200);
        });

        test("returns token when successful", async () => {
            prisma.users.findUnique = jest.fn().mockResolvedValue({
                id: "123",
                username: "test",
                password: "hashPass",
            });

            bcrypt.compare = jest.fn().mockResolvedValue(true);

            const res = await supertest(server).post("/routes/auth/login").send({
                username: "test",
                password: "hashPass",
            });

            expect(res.body.token).toBeTruthy();
        });

        test("returns 401 when NOT successful", async () => {
            prisma.users.findUnique = jest.fn().mockResolvedValue({
              id: 123,
              username: "test",
              password: "password",
            });
    
            bcrypt.compare = jest.fn().mockResolvedValue(false);
    
            const res = await supertest(server).post("/routes/auth/login").send({
              username: "test",
              password: "pass123",
            });
    
            expect(res.status).toBe(401);
        });

        test("returns error message when NOT successful", async () => {
            prisma.users.findUnique = jest.fn().mockResolvedValue({
              id: 123,
              username: "test",
              password: "password",
            });
    
            bcrypt.compare = jest.fn().mockResolvedValue(false);
    
            const res = await supertest(server).post("/routes/auth/login").send({
              username: "test",
              password: "pass123",
            });
    
            expect(res.text).toBe("Invalid login credentials");
          });
        });
    })
