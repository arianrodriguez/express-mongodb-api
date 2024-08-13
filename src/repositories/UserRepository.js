import Database from "../config/DatabaseConnection.js";

class UserRepository {
    constructor() {
        this.db = Database.getInstance();
    }

    async getAll() {
        const user = this.db.getModel("User");
        if (!user) throw new Error("User model not found");
        
        return await user.find();
    }

    async create(data) {
        const user = this.db.getModel("User");
        if (!user) throw new Error("User model not found");

        return await user.create(data);
    }
}

export default UserRepository;