const express = require('express');
const { readFile } = require('fs');

const app = express();

async function countStudents(path) {
  return new Promise((resolve, reject) => {
    readFile(path, { encoding: 'utf-8' }, (err, dbString) => {
      if (err) return reject(Error('Cannot load the database'));
      const db = dbString.split('\n');
      let colTitles;
      let length = 0;
      const fields = {};
      let string = '';
      if (db && db[0]) {
        colTitles = db[0].split(',');
        if (colTitles.length !== 4) return reject(Error('Cannot load the database'));
        if (colTitles[3] !== 'field') return reject(Error('Cannot load the database'));
      } else return reject(Error('Cannot load the database'));
      const entries = db.slice(1);
      entries.forEach((entry) => {
        if (entry) {
          length += 1;
          const itemArray = entry.split(',');
          const firstName = itemArray[0];
          const field = itemArray[3];
          if (Object.keys(fields).includes(field)) {
            fields[field].push(firstName);
          } else fields[field] = [firstName];
        }
      });
      string += `Number of students: ${length}\n`;
      Object.entries(fields).forEach(([field, values]) => {
        string += `Number of students in ${field}: ${
          values.length
        }. List: ${values.join(', ')}\n`;
      });
      return resolve(string);
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const start = 'This is the list of our students\n';
  try {
    countStudents(process.argv[2].toString())
      .then((string) => {
        res.send(start + string.slice(0, -1));
      })
      .catch(() => {
        res.status(500).send(`${start}Cannot load the database`);
      });
  } catch {
    res.status(500).send(`${start}Cannot load the database`);
  }
});
app.listen(1245, () => {});

module.exports = app;
