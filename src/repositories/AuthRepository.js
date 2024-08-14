import Database from "../config/DatabaseConnection.js";

class AuthRepository {
    constructor() {
        this.db = Database.getInstance();
    }

    async register(username, password) {
        const User = this.db.getModel("User");
        const user = new User({ username, password });
        return await user.save();
    }

    async login(username, password) {
        const User = this.db.getModel("User");
        return await User.findOne({
            username
        });
    }

    async getUserByUsername(username) {
        const User = this.db.getModel("User");
        return await User.findOne({ username });
    }
}

export default AuthRepository;