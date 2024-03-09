// app.spec.js
const request = require('supertest');
const { MongoClient, ObjectId } = require("mongodb");
const app = require('./app');
const UserRepository = require('./user-repository');

describe("UserApi", () => {
    let userRepository;
    let collection;
    let client;

    beforeAll(async () => {
        const uri = 'mongodb://127.0.0.1:27017/workshop_mongo';
        client = new MongoClient(uri);
        await client.connect();
        collection = client.db('workshop_mongo').collection('user');
        userRepository = new UserRepository(collection);
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await collection.deleteMany({});
    });

    describe("/users", () => {
        describe("GET /", () => {
            test("Deve retornar uma lista vazia de usuários", async () => {
                const response = await request(app).get('/users');
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual([]);
            });

            test("Deve retornar uma lista contendo 2 usuários", async () => {
                // Inserir dois usuários diretamente no banco para testar a consulta
                await collection.insertMany([
                    { name: "Usuário 1", email: "email1@teste.com" },
                    { name: "Usuário 2", email: "email2@teste.com" }
                ]);
                const response = await request(app).get('/users');
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(2);
            });
        });
    });

    describe("POST /users", () => {
        test("Deve incluir um usuário no banco de dados", async () => {
            const newUser = { name: "Novo Usuário", email: "novoemail@teste.com" };
            const response = await request(app).post('/users').send(newUser);
            expect(response.statusCode).toBe(201);
            const userInDb = await collection.findOne({ email: "novoemail@teste.com" });
            expect(userInDb).not.toBeNull();
        });

        test("Não deve permitir a inclusão de usuários com o e-mail duplicado", async () => {
            const newUser = { name: "Usuário Duplicado", email: "duplicado@teste.com" };
            await collection.insertOne(newUser);
            const response = await request(app).post('/users').send(newUser);
            expect(response.statusCode).toBe(400); // Supondo que o código retorne 400 para duplicatas
        });
    });

    describe("/users/:id", () => {
        test("Deve retornar os dados de um usuário", async () => {
            const user = await collection.insertOne({ name: "Usuário Detalhe", email: "detalhe@teste.com" });
            const response = await request(app).get(`/users/${user.insertedId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe("Usuário Detalhe");
        });

        test("Deve retornar status code 404 para um usuário não existente", async () => {
            const fakeId = new ObjectId();
            const response = await request(app).get(`/users/${fakeId}`);
            expect(response.statusCode).toBe(404);
        });
    });

    describe("PUT /users/:id", () => {
        test("Deve atualizar os dados de um usuário", async () => {
            const user = await collection.insertOne({ name: "Usuário Para Atualizar", email: "atualizar@teste.com" });
            const response = await request(app).put(`/users/${user.insertedId}`).send({ name: "Usuário Atualizado" });
            expect(response.statusCode).toBe(200);
            const updatedUser = await collection.findOne({ _id: user.insertedId });
            expect(updatedUser.name).toBe("Usuário Atualizado");
        });

        test("Deve retornar status code 404 para um usuário não existente", async () => {
            const fakeId = new ObjectId();
            const response = await request(app).put(`/users/${fakeId}`).send({ name: "Inexistente" });
            expect(response.statusCode).toBe(404);
        });
    });

    describe("DELETE /users/:id", () => {
        test("Deve remover um usuário", async () => {
            const user = await collection.insertOne({ name: "Usuário Para Remover", email: "remover@teste.com" });
            const response = await request(app).delete(`/users/${user.insertedId}`);
            expect(response.statusCode).toBe(204);
            const deletedUser = await collection.findOne({ _id: user.insertedId });
            expect(deletedUser).toBeNull();
        });

        test("Deve retornar status code 404 para um usuário não existente", async () => {
            const fakeId = new ObjectId();
            const response = await request(app).delete(`/users/${fakeId}`);
            expect(response.statusCode).toBe(404);
        });
    });
});
