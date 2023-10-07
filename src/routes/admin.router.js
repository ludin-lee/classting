import express from "express";
import AdminController from "../controllers/admin.controller.js";

const router = express.Router();
const adminController = new AdminController();

//CREATE_ADMIN
router.post("/", adminController.createAdmin);

export default router;
