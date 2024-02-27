import { readFile } from 'fs';

// const countStudents = (path) => new Promise((resolve, reject) => {
//   if (!path) {
//     reject(new Error('Cannot load the database'));
//   }
//   if (path) {
//     readFile(path, (err, data) => {
//       if (err) {
//         return reject(new Error('Cannot load the database'));
//       }
//       const reportParts = [];
//       const lines = data.toString('utf-8').trim().split('\n');
//       const fields = {};
//       const colTitles = lines[0].split(',');
//       const propNames = colTitles.slice(
//         0,
//         colTitles.length - 1,
//       );

//       lines.slice(1).forEach((line) => {
//         const entries = line.split(',');
//         const properties = entries.slice(
//           0,
//           entries.length - 1,
//         );
//         const field = entries[entries.length - 1];
//         if (!Object.keys(fields).includes(field)) {
//           fields[field] = [];
//         }
//         const studentEntries = propNames.map((propName, idx) => [
//           propName,
//           properties[idx],
//         ]);
//         fields[field].push(Object.fromEntries(studentEntries));
//       });

//       const totalStudents = Object.values(fields).reduce(
//         (pre, cur) => (pre || []).length + cur.length,
//       );
//       reportParts.push(`Number of students: ${totalStudents}`);
//       Object.entries(fields).forEach(([field, group]) => {
//         reportParts.push([
//           `Number of students in ${field}: ${group.length}.`,
//           'List:',
//           group.map((student) => student.firstname).join(', '),
//         ].join(' '));
//       });
//       return resolve(reportParts.join('\n'));
//     });
//   }
// });

const readDatabase = async (path) => new Promise((resolve, reject) => {
  readFile(path, { encoding: 'utf-8' }, (err, dbString) => {
    if (err) return reject(Error('Cannot load the database'));
    const db = dbString.split('\n');
    let colTitles;
    const fields = {};
    if (db && db[0]) {
      colTitles = db[0].split(',');
      if (colTitles.length !== 4) return reject(Error('Cannot load the database'));
      if (colTitles[3] !== 'field') return reject(Error('Cannot load the database'));
    } else return reject(Error('Cannot load the database'));
    const entries = db.slice(1);
    entries.forEach((entry) => {
      if (entry) {
        const itemArray = entry.split(',');
        const keyValues = [];
        itemArray.slice(0, -1).forEach((item, i) => {
          keyValues.push([colTitles[i], item]);
        });
        const field = itemArray[3];
        if (Object.keys(fields).includes(field)) {
          fields[field].push(Object.fromEntries(keyValues));
        } else fields[field] = [Object.fromEntries(keyValues)];
      }
    });

    return resolve(fields);
  });
});

export default readDatabase;
