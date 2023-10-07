import express from "express";
import SubscribeController from "../controllers/subscribe.controller.js";
import Authorizer from "../middlewares/authorizer.js";

const router = express.Router();
const subscribeController = new SubscribeController();
const authorizer = new Authorizer();

//SUBSCRIBE_SCHOOL
router.post(
  "/:schoolId",
  authorizer.checkToken,
  subscribeController.subscribeSchool
);

//UNSUBSCRIBE_SCHOOL
router.delete(
  "/:schoolId",
  authorizer.checkToken,
  subscribeController.unsubscribeSchool
);

export default router;
