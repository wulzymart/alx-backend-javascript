import readDatabase from "../utils";

const cmp = (a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};
const MAJORS = ["CS", "SWE"];

class StudentsController {
  static getAllStudents(request, response) {
    const path = process.argv.length > 2 ? process.argv[2] : "";
    const start = "This is the list of our students\n";

    readDatabase(path)
      .then((data) => {
        let string = "";
        for (const [field, students] of Object.entries(data)) {
          const firstNames = students
            .map((student) => student.firstname)
            .sort(cmp);
          string += `Number of students in ${field}: ${
            firstNames.length
          }. List: ${firstNames.join(", ")}\n`;
        }
        response.send(start + string.slice(0, -1));
      })
      .catch(() => {
        response.status(500).send(start + "Cannot load the database");
      });
  }
  static getAllStudentsByMajor(request, response) {
    const path = process.argv.length > 2 ? process.argv[2] : "";
    const start = "This is the list of our students\n";
    const { major } = request.params;

    if (!MAJORS.includes(major)) {
      return response.status(500).send("Major parameter must be CS or SWE");
    }
    readDatabase(path)
      .then((data) => {
        const students = data[major];
        let string = "";
        if (students) {
          const firstnames = students
            .map((student) => student.firstname)
            .sort(cmp);
          string += `List: ${firstnames.join(", ")}\n`;
        }
        response.send(start + string ? string.slice(0, -1) : "");
      })
      .catch((err) => {
        console.log(err);
        response.status(500).send(start + "Cannot load the database");
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
