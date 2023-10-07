import express from "express";
import SchoolController from "../controllers/school.controller.js";
import Authorizer from "../middlewares/authorizer.js";

const router = express.Router();
const schoolController = new SchoolController();
const authorizer = new Authorizer();

//CREATE_SCHOOL
router.post("/", authorizer.checkToken, schoolController.createSchool);

//GET_MY_SCHOOL_LIST
router.get("/list", authorizer.checkToken, schoolController.getSchoolList);

export default router;
