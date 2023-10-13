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

  //studentSchoolMapping-student 1:N 관계
  db.student.belongsTo(db.studentSchoolMapping, {
    as: "studentSchoolMapping",
    foreignKey: "studentId",
    onDelete: "cascade",
  });
  db.studentSchoolMapping.hasMany(db.student, {
    as: "students",
    foreignKey: "studentId",
    onDelete: "cascade",
  });

  //studentSchoolMapping-school 1:N 관계
  db.school.belongsTo(db.studentSchoolMapping, {
    as: "studentSchoolMapping",
    foreignKey: "schoolId",
    onDelete: "cascade",
  });
  db.studentSchoolMapping.hasMany(db.school, {
    as: "schools",
    foreignKey: "schoolId",
    onDelete: "cascade",
  });
}
