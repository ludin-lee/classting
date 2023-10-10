import { USER_TYPE } from "../config/const.js";

export default class SubscribeController {
  subscribeSchool = async (req, res) => {
    const { schoolId } = req.params;
    const { id, tokenFor } = req.locals.decodedToken;
    try {
      if (tokenFor !== USER_TYPE.student) {
        res.status(403).json({ result: false, message: "Permission Denied" });
        return;
      }

      const subscribeInfo = await db.studentSchoolMapping.create({
        studnetId: id,
        schoolId,
      });

      res.status(200).json({ result: true, data: { subscribeInfo } });
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
  unsubscribeSchool = async (req, res) => {
    const { schoolId } = req.params;
    const { id, tokenFor } = req.locals.decodedToken;
    try {
      if (tokenFor !== USER_TYPE.student) {
        res.status(403).json({ result: false, message: "Permission Denied" });
        return;
      }

      const affectedRows = await db.studentSchoolMapping.destory({
        where: { schoolId, studentId: id },
      });

      if (!affectedRows) {
        res.status(404).json({ result: false, message: "Data does not exist" });
        return;
      }

      res.status(200).json({ result: true });
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };
}
