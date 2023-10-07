import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();
const authController = new AuthController();

//GET_ADMIN_TOKEN
router.post("/:userType", authController.Login);

export default router;
