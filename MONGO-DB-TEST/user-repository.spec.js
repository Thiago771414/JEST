const { MongoClient } = require("mongodb");
const UserRepository = require('./user-repository');

describe ('UserRepository', () => {

    let userRepository;
    let collection;
    let client;

    beforeAll(async () => {
        const uri = 'mongodb://127.0.0.1:27017/workshop_mongo'
        client = new MongoClient(uri)
        await client.connect();

        console.log("Conectado ao MongoDB no banco de dados workshop_mongo");
        collection = client.db('workshop_mongo').collection('user');
        const documents = await collection.find({}).toArray();
        console.log(documents);
        userRepository = new UserRepository(collection);
    })

    afterAll(async () => {
        await client.close()
    })

    beforeEach(async () => {
        await collection.deleteMany({})
    })

    describe('findOneByEmail', () => {
        test('deve retornar o usuário thiagodev@gmail.com', async () => {
            const result = await collection.insertOne({
                email: 'thiagodev@gmail.com',
                name: 'thiago dev',
            });
    
            const user = await userRepository.findOneByEmail('thiagodev@gmail.com');
            expect(user).toMatchObject({
                _id: result.insertedId,
                name: 'thiago dev',
                email: 'thiagodev@gmail.com',
            });
        });
    
        test('deve lançar uma exceção para um usuário não existente', async () => {
            await expect(userRepository.findOneByEmail('naoexiste@gmail.com')).resolves.toBeNull();
        });
    });
    
    describe('insert', () => {
        test('deve inserir um novo usuário', async () => {
            const newUser = {
                email: 'novousuario@gmail.com',
                name: 'Novo Usuario',
            };
            const insertedUser = await userRepository.insert(newUser);
            expect(insertedUser).toMatchObject(newUser);
    
            const userInDb = await collection.findOne({ email: 'novousuario@gmail.com' });
            expect(userInDb).toMatchObject(newUser);
        });
    });
    
    describe('update', () => {
        test('deve atualizar um usuário existente', async () => {
            const user = await collection.insertOne({
                email: 'usuarioexistente@gmail.com',
                name: 'Usuario Existente',
            });
            const updatedUser = await userRepository.update(user.insertedId, { name: 'Usuario Atualizado' });
            expect(updatedUser.name).toBe('Usuario Atualizado');
    
            const userInDb = await collection.findOne({ _id: user.insertedId });
            expect(userInDb.name).toBe('Usuario Atualizado');
        });
    
        test('deve lançar uma exceção para um usuário não existente', async () => {
            await expect(userRepository.update('idinexistente', { name: 'Teste' })).rejects.toThrow();
        });
    });
    
    describe('delete', () => {
        test('deve remover um usuário existente', async () => {
            const user = await collection.insertOne({
                email: 'usuariopararemover@gmail.com',
                name: 'Usuario Para Remover',
            });
            await userRepository.delete(user.insertedId);
            const userInDb = await collection.findOne({ _id: user.insertedId });
            expect(userInDb).toBeNull();
        });
    
        test('deve lançar uma exceção para um usuário não existente', async () => {
            await expect(userRepository.delete('idinexistente')).rejects.toThrow();
        });
    });
    
    describe('findAll', () => {
        test('deve retornar uma lista vazia de usuários', async () => {
            const users = await userRepository.findAll();
            expect(users).toEqual([]);
        });
    
        test('deve retornar uma lista contendo 2 usuários', async () => {
            await collection.insertMany([
                { email: 'usuario1@gmail.com', name: 'Usuario 1' },
                { email: 'usuario2@gmail.com', name: 'Usuario 2' }
            ]);
            const users = await userRepository.findAll();
            expect(users.length).toBe(2);
        });
    });
})