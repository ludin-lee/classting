import express from "express";
// import friendRotuer from "./friend.router.js";
// import pointRouter from "./point.router.js";
// import authRouter from "./auth.router.js";
const router = express.Router();

// TODO: All the code here should be deleted or changed appropriately in the future.

router.get("/liveness", (req, res) => {
  res.status(204).send("OK");
});

// router.use("/friend", friendRotuer);
// router.use("/point", pointRouter);
// router.use("/auth", authRouter);

export default router;
