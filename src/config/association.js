export default function associationAll(db) {
  // school-news 1:N관계
  db.school.belongsTo(db.news, {
    as: "schoolId_news",
    foreignKey: "schoolId",
    onDelete: "cascade",
  });
  db.news.hasMany(db.school, {
    as: "schools",
    foreignKey: "friendId",
    onDelete: "cascade",
  });

  //studentSchoolMapping-student 1:N 관계
  db.studentSchoolMapping.belongsTo(db.student, {
    as: "studentId_studnets",
    foreignKey: "studentId",
    onDelete: "cascade",
  });
  db.student.hasMany(db.studentSchoolMapping, {
    as: "studentSchoolMappings",
    foreignKey: "studentId",
    onDelete: "cascade",
  });

  //studentSchoolMapping-school 1:N 관계
  db.studentSchoolMapping.belongsTo(db.school, {
    as: "schoolId_schools",
    foreignKey: "schoolId",
    onDelete: "cascade",
  });
  db.school.hasMany(db.studentSchoolMapping, {
    as: "studentSchoolMappings",
    foreignKey: "schoolId",
    onDelete: "cascade",
  });
}
