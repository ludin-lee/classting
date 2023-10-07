import jwt from "jsonwebtoken";

export default class Authorizer {
  checkToken = (req, res, next) => {
    const token = req.headers?.authorization?.split("Bearer ")[1];
    req.locals = {};
    req.locals.token = token;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.locals.decodedToken = decodedToken;
      next();
    } catch (err) {
      res.status(401).json({
        result: false,
        message: "Invalid token",
      });
    }
  };
}
