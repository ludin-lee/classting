import path from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";
import { DataTypes, Sequelize } from "sequelize";
import associationAll from "../config/association.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = { sequelize: null, Sequelize };

const {
  DB_DATABASE: DATABASE,
  DB_PORT: PORT,
  DB_READERHOST: READERHOST,
  DB_HOST: HOST,
  DB_USERNAME: USERNAME,
  DB_PASSWORD: PASSWORD,
  DB_CHARSET: CHARSET,
  DB_COLLATE: COLLATE,
  DB_DIALECT: DIALECT,
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
