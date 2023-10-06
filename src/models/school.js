export default function (sequelize, DataTypes) {
  return sequelize.define(
    "school",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
      paranoid: true,
    }
  );
}
