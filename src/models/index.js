import path from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";
import { DataTypes, Sequelize } from "sequelize";
import associationAll from "../config/association.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = { sequelize: null, Sequelize };

const {
  MF_DB_DATABASE: DATABASE,
  MF_DB_PORT: PORT,
  MF_DB_READERHOST: READERHOST,
  MF_DB_HOST: HOST,
  MF_DB_USERNAME: USERNAME,
  MF_DB_PASSWORD: PASSWORD,
  MF_DB_CHARSET: CHARSET,
  MF_DB_COLLATE: COLLATE,
  MF_DB_DIALECT: DIALECT,
} = process.env;

try {
  db.sequelize = new Sequelize(DATABASE, null, null, {
    port: PORT,
    replication: {
      read: [
        {
          host: HOST,
          username: USERNAME,
          password: PASSWORD,
        },
      ],
      write: {
        host: HOST,
        username: USERNAME,
        password: PASSWORD,
      },
    },
    dialect: DIALECT,
    define: {
      timestamps: true,
      freezeTableName: true,
      charset: CHARSET,
      collate: COLLATE,
    },
    dialectOptions: { multipleStatements: true },
    omitNull: true,
  });

  await db.sequelize.authenticate();

  const files = readdirSync(__dirname).filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== path.basename("index.js") &&
      file.slice(-3) === ".js"
  );

  for await (const file of files) {
    const model = await import("./" + file);
    const namedModel = model.default(db.sequelize, DataTypes);
    db[namedModel.name] = namedModel;
  }

  associationAll(db);
} catch (e) {
  console.error("Unable to connect to the database:", e);
  await db.sequelize?.close();
}

export default db;
