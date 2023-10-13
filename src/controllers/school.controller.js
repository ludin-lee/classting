import { USER_TYPE } from "../config/const.js";
import db from "../models/index.js";

export default class SchoolController {
  createSchool = async (req, res) => {
    const { name, region } = req.body;
    const { tokenFor } = req.locals.decodedToken;

    if (tokenFor !== USER_TYPE.admin) {
      res.status(403).json({ result: false, message: "Permission Denied" });
      return;
    }

    try {
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
        res.status(500).json({ result: false, message: "Server Error" });
      }
    }
  };
  getSchoolList = async (req, res) => {
    const { tokenFor, id } = req.locals.decodedToken;

    if (tokenFor !== USER_TYPE.student) {
      res.status(403).json({ result: false, message: "Permission Denied" });
      return;
    }
    try {
      const schoolList = await db.studentSchoolMapping.findAll({
        where: { studentId: id },
        attributes: [
          [db.sequelize.col("school.id"), "id"],
          [db.sequelize.col("school.name"), "name"],
          [db.sequelize.col("school.region"), "region"],
        ],
        include: {
          model: db.school,
          as: "school",
          attributes: [],
        },
      });

      res.status(200).json({ result: true, data: { schoolList } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ result: false, message: "Server Error" });
    }
  };
}
