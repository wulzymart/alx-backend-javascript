export default function updateStudentGradeByCity(list, city, newGrade) {
  return list.filter((student) => student.location === city).map((student) => {
    const grade = newGrade.find((grade) => grade.studentId === student.id);
    return { ...student, grade: grade ? grade.grade : 'N/A' };
  });
}
