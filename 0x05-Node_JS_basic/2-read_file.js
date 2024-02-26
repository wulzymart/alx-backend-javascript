const { readFileSync } = require('fs');

module.exports = function countStudents(path) {
  try {
    const dbString = readFileSync(path, 'utf-8');
    const db = dbString.split('\n');
    let colTitles;
    let length = 0;
    const fields = {};
    if (db && db[0]) {
      colTitles = db[0].split(',');
      if (colTitles.length !== 4) throw new Error('Cannot load the database');
      if (colTitles[3] !== 'field') throw new Error('Cannot load the database');
    } else throw new Error('Cannot load the database');
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
        `Number of students in ${field}: ${values.length}. List: ${values.join(
          ', ',
        )}`,
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error('Cannot load the database');
  }
};
