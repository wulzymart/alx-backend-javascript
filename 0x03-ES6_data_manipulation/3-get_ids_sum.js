export default function getStudentIdsSum(list) {
  return list.reduce((acc, cur) => acc + cur.id, 0);
}
