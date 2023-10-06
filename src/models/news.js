export default function (sequelize, DataTypes) {
  return sequelize.define(
    "news",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      schoolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );
}
