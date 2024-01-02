export default function createIteratorObject(report) {
  let arr = [];
  for (const val of Object.values(report.allEmployees)) {
    arr = [...arr, ...val];
  }
  return arr;
}
