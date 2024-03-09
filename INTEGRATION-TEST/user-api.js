const superagent = require('superagent')

class UserApi {
    findAll(){
        return new Promise((res, rej) => {
            superagent
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => res(response.body))
            .catch(rej)
        })
    }

    findOne(id){
        return new Promise((res, rej) => {
            superagent
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => res(response.body))
            .catch(rej)
        })
    }

    findOne(id){
        return new Promise((res, rej) => {
            superagent
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => res(response.body))
            .catch(response => rej(Error(`User ${id} was not found`)))
        })
    }
}

module.exports = UserApi;
