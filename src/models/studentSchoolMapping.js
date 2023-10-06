export default function (sequelize, DataTypes) {
  return sequelize.define(
    "studentSchoolMapping",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      schoolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["studentId", "schoolId"],
        },
      ],
      paranoid: true,
    }
  );
}
