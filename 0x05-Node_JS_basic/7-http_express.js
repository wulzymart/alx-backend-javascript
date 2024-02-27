const express = require('express');
const { readFile } = require('fs');

const app = express();

const countStudents = (path) => new Promise((resolve, reject) => {
  if (!path) {
    reject(new Error('Cannot load the database'));
  }
  if (path) {
    readFile(path, (err, data) => {
      if (err) {
        return reject(new Error('Cannot load the database'));
      }
      const reportParts = [];
      const lines = data.toString('utf-8').trim().split('\n');
      const fields = {};
      const colTitles = lines[0].split(',');
      const propNames = colTitles.slice(
        0,
        colTitles.length - 1,
      );

      lines.slice(1).forEach((line) => {
        const entries = line.split(',');
        const properties = entries.slice(
          0,
          entries.length - 1,
        );
        const field = entries[entries.length - 1];
        if (!Object.keys(fields).includes(field)) {
          fields[field] = [];
        }
        const studentEntries = propNames.map((propName, idx) => [
          propName,
          properties[idx],
        ]);
        fields[field].push(Object.fromEntries(studentEntries));
      });

      const totalStudents = Object.values(fields).reduce(
        (pre, cur) => (pre || []).length + cur.length,
      );
      reportParts.push(`Number of students: ${totalStudents}`);
      Object.entries(fields).forEach(([field, group]) => {
        reportParts.push([
          `Number of students in ${field}: ${group.length}.`,
          'List:',
          group.map((student) => student.firstname).join(', '),
        ].join(' '));
      });
      return resolve(reportParts.join('\n'));
    });
  }
});

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
