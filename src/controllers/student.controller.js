import db from "../models/index.js";
import { generatePassword } from "../utils/crypto.js";

export default class StudentController {
  createStudent = async (req, res) => {
    const { email, name, password } = req.body;

    try {
      const userInfo = await db.student.create({
        email,
        name,
        password: generatePassword(password),
      });

      res.status(200).json({ result: true, data: { userInfo } });
    } catch (err) {
      if (err.original?.code === "ER_DUP_ENTRY") {
        res.status(409).json({ result: false, message: "Duplicated data" });
      } else {
        console.error(err);
        res.status(500).json({ result: false, message: "Server Error" });
      }
    }
  };
}
