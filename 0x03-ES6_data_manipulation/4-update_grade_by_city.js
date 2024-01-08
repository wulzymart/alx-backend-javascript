export default function updateStudentGradeByCity(list, city, newGrade) {
  return list.filter((student) => student.location === city).map((student) => {
    const grade = (newGrade.find((grade) => grade.studentId === student.id))?.grade || 'N/A';
    return { ...student, grade };
  });
}
