import { Router } from "express";

import AuthService from "../services/AuthService.js";

const router = Router();

router.post("/sign-up", async(req, res) => {
    const authService = new AuthService();

    try {
        const result = await authService.register(req.body.username, req.body.password);
        if (result) res.status(201).json(result);
        else res.status(400).json({message: "User already exists"});

    } catch(e) {
        console.log(e);
        return res.status(500).json({message: e.message || "Internal server error"});
    } finally {
        console.log("Request finished");
    }
});

router.post("/sign-in", async(req, res) => {
    const authService = new AuthService();

    try {
        const result = await authService.login(req.body.username, req.body.password);

        res.status(200).json(result);
    } catch(e) {
        return res.status(500).json({message: e.message || "Internal server error"});
    } finally {
        console.log("Request finished");
    }
});

export default router;