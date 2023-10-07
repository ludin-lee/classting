import { USER_TYPE } from "../config/const.js";
import db from "../models/index.js";

export default class SchoolController {
  createSchool = async (req, res) => {
    const { name, region } = req.body;
    const { tokenFor } = req.locals.decodedToken;

    try {
      if (tokenFor !== USER_TYPE.admin) {
        res.status(403).json({ result: false, message: "Permission Denied" });
        return;
      }

      const schoolInfo = await db.school.create({
        name,
        region,
      });

      res.status(200).json({ result: true, data: { schoolInfo } });
    } catch (err) {
      if (err.original?.code === "ER_DUP_ENTRY") {
        res.status(409).json({ result: false, message: "Duplicated data" });
      } else {
        console.error(err);
        res.status(err.status || 500).json({
          result: false,
          message: err.message || "Server Error",
        });
      }
    }
  };
  getSchoolList = async (req, res) => {
    try {
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };
}
