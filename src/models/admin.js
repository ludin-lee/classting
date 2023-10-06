export default function (sequelize, DataTypes) {
  return sequelize.define(
    "admin",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(128),
      },
      name: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          fields: ["name"],
        },
        {
          unique: true,
          fields: ["email"],
        },
      ],
      paranoid: true,
    }
  );
}
