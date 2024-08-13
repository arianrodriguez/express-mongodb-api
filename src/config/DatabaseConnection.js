import mongoose from "mongoose";
import User from "../models/User.js";

class Database {
    static #instance = null;

    constructor() {
        if (Database.#instance) {
            throw new Error("Cannot instantiate directly. Use getInstance() instead.");
        }
        this.connection = null;
        this.models = {};
    }

    static getInstance() {
        if (Database.#instance === null) {
            Database.#instance = new Database();
        }
        return Database.#instance;
    }

    async connect() {
        if (this.connection) {
            console.log("Already connected to the database.");
            return this.connection;
        }

        try {
            this.connection = await mongoose.connect(`mongodb://${process.env.SERVER_DATABASE}:${process.env.PORT_DATABASE}/${process.env.DATABASE_NAME}`);

            this.models.User = User;

            console.log("Database connected successfully");
            return this.connection;
        } catch (error) {
            console.error("Database connection failed", error);
            throw error;
        }
    }

    getModel(name) {
        return this.models[name];
    }
}

export default Database;
