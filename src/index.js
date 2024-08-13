import Server from "./server/App.js";
import dotenv from "dotenv";

dotenv.config();

const server = new Server();
server.start();