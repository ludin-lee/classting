import "./env.js";
import db from "../models/index.js";

await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

await db.admin.sync({ alter: true });
await db.news.sync({ alter: true });
await db.school.sync({ alter: true });
await db.student.sync({ alter: true });
await db.studentSchoolMapping.sync({ alter: true });

await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
await db.sequelize.close();
