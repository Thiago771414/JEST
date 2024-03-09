class UserRepository {
    constructor(collection) {
        this.collection = collection;
    }

    async findOneByEmail(email) {
        const user = await this.collection.findOne({email});
        return user;
    }

    async insert(user) {
        const result = await this.collection.insertOne(user);
        return result.ops[0];
    }

    async update(id, userData) {
        const result = await this.collection.findOneAndUpdate(
            { _id: id },
            { $set: userData },
            { returnOriginal: false }
        );
        if (!result.value) {
            throw new Error('Usuário não encontrado.');
        }
        return result.value;
    }

    async delete(id) {
        const result = await this.collection.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error('Usuário não encontrado para deletar.');
        }
    }

    async findAll() {
        const users = await this.collection.find({}).toArray();
        return users;
    }
}

module.exports = UserRepository;
