import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

import AuthRepository from "../repositories/AuthRepository.js";

class AuthService {
    constructor() {
        this.repository = new AuthRepository();
    }

    async register(username, password) {
        if(!username || !password) throw new Error("Username and password are required");

        const user = await this.repository.getUserByUsername(username);
        if(user) throw new Error("User already exists");


        const hashedPassword = await bcrypt.hash(password.toString(), 10); // 10 is the salt rounds
        console.log('hashedPassword', hashedPassword);
        return await this.repository.register(username, hashedPassword);
    }

    async login(username, password) {
        if(!username || !password) throw new Error("Username and password are required");

        const user = await this.repository.login(username, password);

        if(!user) throw new Error("Invalid credentials");

        
        const isPasswordValid = await bcrypt.compare(password.toString(), user.password);
        if(!isPasswordValid) throw new Error("Invalid credentials");

        const token = jsonwebtoken.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return { token };
    }
}

export default AuthService;