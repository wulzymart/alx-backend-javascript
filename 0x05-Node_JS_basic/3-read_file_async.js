const { readFile } = require('fs');

module.exports = async function countStudents(path) {
  return new Promise((resolve, reject) => {
    readFile(path, { encoding: 'utf-8' }, (err, dbString) => {
      if (err) return reject(Error('Cannot load the database'));
      const db = dbString.split('\n');
      let colTitles;
      let length = 0;
      const fields = {};
      if (db && db[0]) {
        colTitles = db[0].split(',');
        if (colTitles.length !== 4) return reject(Error('Cannot load the database'));
        if (colTitles[3] !== 'field') return reject(Error('Cannot load the database'));
      } else return reject(Error('Cannot load the database'));
      const entries = db.slice(1);
      for (const entry of entries) {
        if (entry) {
          length++;
          const itemArray = entry.split(',');
          const firstName = itemArray[0];
          const field = itemArray[3];
          if (Object.keys(fields).includes(field)) {
            fields[field].push(firstName);
          } else fields[field] = [firstName];
        }
      }
      console.log(`Number of students: ${length}`);
      for (const [field, values] of Object.entries(fields)) {
        console.log(
          `Number of students in ${field}: ${
            values.length
          }. List: ${values.join(', ')}`,
        );
      }
      resolve();
    });
  });
};
