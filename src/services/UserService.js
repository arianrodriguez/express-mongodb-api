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
}

export default UserService;