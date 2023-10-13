import express from "express";
import NewsController from "../controllers/news.controller.js";
import Authorizer from "../middlewares/authorizer.js";

const router = express.Router();
const newsController = new NewsController();
const authorizer = new Authorizer();

//CREATE_NEWS
router.post("/:schoolId", authorizer.checkToken, newsController.createNews);

//UPDATE_NEWS
router.put("/", authorizer.checkToken, newsController.updateNews);

//DELETE_NEWS
router.delete("/:newsId", authorizer.checkToken, newsController.deleteNews);

//GET_SCHOOL_NEWS (by School ID)
router.get("/", authorizer.checkToken, newsController.getNews);

//GET_ALL_SCHOOL_NEWS
router.get("/all", authorizer.checkToken, newsController.getAllNews);

export default router;
