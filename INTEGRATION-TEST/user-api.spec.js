const { expect } = require('@jest/globals')
const UserApi = require('./user-api')

describe("userApi", () => {

    describe("findAll", () => {
        test("Deve retornar lista de usuários", () => {
            
            const userApi = new UserApi()

            return userApi.findAll().then(users => {
                console.info(users)
                expect(users.length).toBeGreaterThan(0)
            })
        });
    })

    describe("findOne", () => {
        test("Deve retornar um usuário existente", () => {
            const userApi = new UserApi()
            return userApi.findOne(1).then(user => {
                console.info(user)
                expect(user.id).toBe(1)
            })
        });
        test("Deve retornar um usuário existente", () => {
            const userApi = new UserApi()
            return userApi.findOne(10000).catch(exception => {
                expect(exception.message).toBe("User 10000 was not found")
            })
        });
    })
});