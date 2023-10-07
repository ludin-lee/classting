import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();
const authController = new AuthController();

//GET_ADMIN_TOKEN
router.post("/:admin", authController.adminLogin);

//GET_STUDENT_TOKEN
router.post("/:student", authController.studentLogin);

export default router;
