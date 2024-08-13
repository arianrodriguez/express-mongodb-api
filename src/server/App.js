import express from "express";
import Database from "../config/DatabaseConnection.js";
import UserRoute from "../routes/UserRoute.js";


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = null;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use("/users", UserRoute);
    }

    async start() {
        try {
            this.server = this.app.listen(this.port, () => {
                console.log(`Server started on port ${this.port}`);
            });

            const db = Database.getInstance();
            await db.connect();
        } catch (error) {
            console.error("Error starting server: ", error);
            throw error;
        }
    }
}

export default Server;