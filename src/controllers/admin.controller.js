import db from "../models/index.js";
import { generatePassword } from "../utils/crypto.js";

export default class AdminController {
  createAdmin = async (req, res) => {
    const { email, name, password } = req.body;

    try {
      const userInfo = await db.admin.create({
        email,
        name,
        password: generatePassword(password),
      });

      res.status(200).json({ result: true, data: { userInfo } });
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };
}