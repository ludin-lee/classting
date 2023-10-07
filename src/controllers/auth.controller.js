import { generatePassword } from "../utils/crypto.js";
import { EXPIRES_IN, USER_TYPE } from "../config/const.js";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const { JWT_SECRET } = process.env;

export default class AuthController {
  login = async (req, res) => {
    const { email, password } = req.body;
    const { userType } = req.params;
    let userInfo;

    try {
      if (!USER_TYPE[userType]) {
        res
          .status(405)
          .json({ result: false, message: "This user type does not exist." });
        return;
      }

      if (userType === USER_TYPE.admin)
        userInfo = await db.admin.findOne({ where: { email } });
      else userInfo = await db.student.findOne({ where: { email } });

      if (!userInfo || userInfo?.password !== generatePassword(password)) {
        res
          .status(401)
          .json({ result: false, message: "Wrong password or email" });
        return;
      }

      const token = jwt.sign(
        {
          id: userInfo.id,
          name: userInfo.name,
          tokenFor: userType,
        },
        JWT_SECRET,
        { expiresIn: EXPIRES_IN }
      );

      res.status(200).json({
        result: true,
        data: {
          tokenType: "Bearer",
          expiresIn: EXPIRES_IN,
          token,
        },
      });
    } catch (err) {
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };
}
