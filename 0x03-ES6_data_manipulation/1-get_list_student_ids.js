export default function getListStudentIds(list) {
  let newArray = [];
  if (Array.isArray(list)) {
    newArray = list.map((student) => student.id);
  }
  return newArray;
}
