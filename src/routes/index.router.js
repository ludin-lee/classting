import express from "express";
import authRouter from "./auth.router.js";
import schoolRouter from "./school.router.js";
import newsRouter from "./news.router.js";
// import subscribeRouter from "./subscribe.router.js";
import adminRouter from "./admin.router.js";
import studentRouter from "./student.router.js";
const router = express.Router();

router.get("/liveness", (req, res) => {
  res.status(204).send("OK");
});

router.use("/login", authRouter);
router.use("/school", schoolRouter);
router.use("/news", newsRouter);
// router.use("/subscribe", subscribeRouter);
router.use("/admin", adminRouter);
router.use("/student", studentRouter);

export default router;
