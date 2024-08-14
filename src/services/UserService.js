import UserRepository from "../repositories/UserRepository.js";

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async getAll() {
        const result = await this.repository.getAll();
        console.log(result);

        return result;
    }

    async create(data) {
        if (!data.username || !data.password) throw new Error("Username and password are required");
        
        const user = {
            "username": data.username,
            "password": data.password,
        }

        const result = await this.repository.create(user);
        console.log(result);

        return result;
    }

    async edit(data, id) {
        // compare if the id is a valid ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid id");

        if (!data.username || !data.password) throw new Error("Username and password are required");
        const user = {...data, id}

        const response = await this.repository.edit(user);

        if(response.matchedCount === 0) throw new Error("User not found");
        
        return user;
    }

    async delete(id) {
        // compare if the id is a valid ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid id");

        const response = await this.repository.delete(id);

        console.log(response)
        if(response.deletedCount === 0) throw new Error("User not found");

        return {message: "User deleted successfully"};
    }
}

export default UserService;