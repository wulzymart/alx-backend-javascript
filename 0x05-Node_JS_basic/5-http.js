const http = require('http');
const { readFile } = require('fs');

async function countStudents(path) {
  return new Promise((resolve, reject) => {
    readFile(path, { encoding: 'utf-8' }, (err, dbString) => {
      if (err) return reject(Error('Cannot load the database'));
      const db = dbString.split('\n');
      let colTitles;
      let length = 0;
      const fields = {};
      const strings = [];
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
      strings.push(`Number of students: ${length}`);

      strings.push(`Number of students: ${length}`);
      Object.entries(fields).forEach(([field, values]) => {
        strings.push([
          `Number of students in ${field}: ${values.length}.`,
          'List:',
          values.join(', '),
        ].join(' '));
      });
      return resolve(strings.join('\n'));
    });
  });
}
const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    try {
      countStudents(process.argv[2].toString())
        .then((string) => {
          res.end(string.slice(0, -1));
        })
        .catch(() => {
          res.statusCode = 500;
          res.end('Cannot load the database');
        });
    } catch {
      res.statusCode = 500;
      res.end('Cannot load the database');
    }
  }
});

app.listen(1245, '127.0.0.1');

module.exports = app;
