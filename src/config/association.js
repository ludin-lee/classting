export default function associationAll(db) {
  // school-news 1:N관계
  db.news.belongsTo(db.school, {
    as: "school",
    foreignKey: "schoolId",
    onDelete: "cascade",
  });
  db.school.hasMany(db.news, {
    as: "news",
    foreignKey: "schoolId",
    onDelete: "cascade",
  });

  //student-studentSchoolMapping 1:N 관계
  db.studentSchoolMapping.belongsTo(db.student, {
    as: "student",
    foreignKey: "studentId",
    onDelete: "cascade",
  });
  db.student.hasMany(db.studentSchoolMapping, {
    as: "studentSchoolMappings",
    foreignKey: "studentId",
    onDelete: "cascade",
  });

  //school-studentSchoolMapping 1:N 관계
  db.studentSchoolMapping.belongsTo(db.school, {
    as: "school",
    foreignKey: "schoolId",
    onDelete: "cascade",
  });
  db.school.hasMany(db.studentSchoolMapping, {
    as: "studentSchoolMappings",
    foreignKey: "schoolId",
    onDelete: "cascade",
  });
}
