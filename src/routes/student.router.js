import express from "express";
import StudentController from "../controllers/admin.controller.js";

const router = express.Router();
const studentController = new StudentController();

//CREATE_STUDENT
router.post("/", studentController.createStudent);

export default router;
