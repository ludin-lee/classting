import { USER_TYPE } from "../config/const.js";

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
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
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
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };
  deleteNews = async (req, res) => {
    const { newsId } = req.query;
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
      res.status(err.status || 500).json({
        result: false,
        message: err.message || "Server Error",
      });
    }
  };
  getNews = () => {};
  getAllNews = () => {};
}
