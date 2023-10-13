import { Op } from "sequelize";
import { USER_TYPE } from "../config/const.js";
import db from "../models/index.js";

export default class NewsController {
  createNews = async (req, res) => {
    const { schoolId } = req.params;
    const { content } = req.body;
    const { tokenFor } = req.locals.decodedToken;

    try {
      if (tokenFor !== USER_TYPE.admin) {
        res.status(403).json({ result: false, message: "Permission Denied" });
        return;
      }

      const newsInfo = await db.news.create({
        schoolId,
        content,
      });

      res.status(200).json({ result: true, data: { newsInfo } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ result: false, message: "Server Error" });
    }
  };

  updateNews = async (req, res) => {
    const { content } = req.body;
    const { newsId } = req.query;
    const { tokenFor } = req.locals.decodedToken;

    try {
      if (tokenFor !== USER_TYPE.admin) {
        res.status(403).json({ result: false, message: "Permission Denied" });
        return;
      }

      const [affectedRows] = await db.news.update(
        { content },
        { where: { id: newsId } }
      );

      if (!affectedRows) {
        res.status(404).json({ result: false, message: "Data does not exist" });
        return;
      }

      res.status(200).json({ result: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ result: false, message: "Server Error" });
    }
  };
  deleteNews = async (req, res) => {
    const { newsId } = req.params;
    const { tokenFor } = req.locals.decodedToken;

    try {
      if (tokenFor !== USER_TYPE.admin) {
        res.status(403).json({ result: false, message: "Permission Denied" });
        return;
      }

      const affectedRows = await db.news.destroy({ where: { id: newsId } });

      if (!affectedRows) {
        res.status(404).json({ result: false, message: "Data does not exist" });
        return;
      }

      res.status(200).json({ result: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ result: false, message: "Server Error" });
    }
  };
  getNews = async (req, res) => {
    const { schoolId } = req.query;
    const { id, tokenFor } = req.locals.decodedToken;
    try {
      if (tokenFor !== USER_TYPE.student) {
        res.status(403).json({ result: false, message: "Permission Denied" });
        return;
      }

      const newsInfo = await db.studentSchoolMapping.findAll({
        where: { schoolId, studentId: id },
        attributes: [],
        include: {
          model: db.school,
          as: "school",
          attributes: ["name", "region"],
          include: {
            model: db.news,
            as: "news",
            attributes: ["content", "createdAt"], // 가져올 열 선택
          },
        },
      });

      res.status(200).json({ result: true, data: { newsInfo } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ result: false, message: "Server Error" });
    }
  };
  getAllNews = async (req, res) => {
    const { id, tokenFor } = req.locals.decodedToken;

    try {
      if (tokenFor !== USER_TYPE.student) {
        res.status(403).json({ result: false, message: "Permission Denied" });
        return;
      }

      const schoolInfo = await db.studentSchoolMapping.findAll({
        where: { studentId: id },
        paranoid: false,
      });

      const newsInfo = [];

      for (const subscription of schoolInfo) {
        const { schoolId, createdAt, deletedAt } = subscription;

        const schoolNews = await db.news.findAll({
          where: {
            schoolId,
            createdAt: {
              [Op.gte]: createdAt,
              [Op.lte]: deletedAt || new Date(),
            },
          },
        });
        newsInfo.push(...schoolNews);
      }

      res.status(200).json({ result: true, data: { newsInfo } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ result: false, message: "Server Error" });
    }
  };
}
