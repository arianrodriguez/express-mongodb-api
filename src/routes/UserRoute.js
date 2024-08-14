import { Router } from "express";
import UserService from "../services/UserService.js";

const router = Router();

router.get("/", async (req, res) => {
    const userService = new UserService();

    try {
        const result = await userService.getAll();
        return res.status(200).json(result);
    }catch(e) {
        console.log(e);
        return res.status(500).json({message: e.message || "Internal server error"});
    }finally {
        console.log("Request finished");
    }
});

router.post("/", async (req, res) => {
    const userService = new UserService();

    try {
        const result = await userService.create(req.body);
        return res.status(201).json(result);
    }catch(e) {
        console.log(e);
        return res.status(500).json({message: e.message || "Internal server error"});
    }finally {
        console.log("Request finished");
    }
});

router.put("/:id", async (req, res) => {
    const userService = new UserService();

    try {
        const result = await userService.edit(req.body, req.params.id);
        return res.status(200).json(result);
    }catch(e) {
        console.log(e)
        return res.status(500).json({message: e.message});
    }
});

router.delete("/:id", async (req, res) => {
    const userService = new UserService();

    try {
        const result = await userService.delete(req.params.id);
        return res.status(200).json(result);
    }catch(e) {
        console.log(e);
        return res.status(500).json({message: e.message});
    }
});

export default router;