import readDatabase from '../utils';

const cmp = (a, b) => {
  const c = a.toLowerCase();
  const d = b.toLowerCase();
  if (c < d) {
    return -1;
  }
  if (c > d) {
    return 1;
  }
  return 0;
};
const MAJORS = ['CS', 'SWE'];

class StudentsController {
  static getAllStudents(request, response) {
    const path = process.argv.length > 2 ? process.argv[2] : '';
    const start = 'This is the list of our students\n';

    return readDatabase(path)
      .then((data) => {
        let string = '';
        Object.entries(data).forEach(([field, students]) => {
          const firstNames = students
            .map((student) => student.firstname)
            .sort(cmp);
          string += `Number of students in ${field}: ${
            firstNames.length
          }. List: ${firstNames.join(', ')}\n`;
        });
        return response.send(start + string.slice(0, -1));
      })
      .catch(() => response.status(500).send(`${start}Cannot load the database`));
  }

  static getAllStudentsByMajor(request, response) {
    const path = process.argv.length > 2 ? process.argv[2] : '';
    const start = 'This is the list of our students\n';
    const { major } = request.params;

    if (!MAJORS.includes(major)) {
      return response.status(500).send('Major parameter must be CS or SWE');
    }
    return readDatabase(path)
      .then((data) => {
        const students = data[major];
        let string = '';
        if (students) {
          const firstnames = students
            .map((student) => student.firstname)
            .sort(cmp);
          string += `List: ${firstnames.join(', ')}\n`;
        }
        return response.send(start + string ? string.slice(0, -1) : '');
      })
      .catch(() => response.status(500).send(`${start}Cannot load the database`));
  }
}

export default StudentsController;
