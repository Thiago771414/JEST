// app.js
const express = require('express');
const { MongoClient, ObjectId } = require("mongodb");
const UserRepository = require('./user-repository');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let userRepository;
let client;
let connected = false;

app.use(async (req, res, next) => {
    if (!connected) {
        const uri = 'mongodb://127.0.0.1:27017/workshop_mongo';
        client = new MongoClient(uri);
        await client.connect();
        const collection = client.db('workshop_mongo').collection('user');
        userRepository = new UserRepository(collection);
        connected = true;
    }
    next();
});

// Rota GET para '/users'
app.get('/users', async (req, res) => {
    const users = await userRepository.findAll();
    res.status(200).json(users)
});

// Rota POST para '/users'
app.post('/users', async (req, res) => {
    try {
        const user = await userRepository.insert(req.body);
        res.status(201).json(user);
    } catch (e) {
        res.status(400).send(e.message); // Supondo tratamento de erro para email duplicado
    }
});

// Rota GET para '/users/:id'
app.get('/users/:id', async (req, res) => {
    try {
        const user = await userRepository.findOneById(ObjectId(req.params.id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        res.status(404).send();
    }
});

// Rota PUT para '/users/:id' - Atualizar um usuário existente
app.put('/users/:id', async (req, res) => {
    try {
        const userExists = await userRepository.findOneById(ObjectId(req.params.id));
        if (!userExists) {
            return res.status(404).send();
        }

        await userRepository.update(ObjectId(req.params.id), req.body);
        const updatedUser = await userRepository.findOneById(ObjectId(req.params.id));
        res.json(updatedUser);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Rota DELETE para '/users/:id' - Remover um usuário
app.delete('/users/:id', async (req, res) => {
    try {
        const userExists = await userRepository.findOneById(ObjectId(req.params.id));
        if (!userExists) {
            return res.status(404).send();
        }

        await userRepository.delete(ObjectId(req.params.id));
        res.status(204).send();
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = app