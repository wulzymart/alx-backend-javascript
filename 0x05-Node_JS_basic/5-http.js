const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (path) => new Promise((resolve, reject) => {
  if (!path) {
    reject(new Error('Cannot load the database'));
  }
  if (path) {
    fs.readFile(path, (err, data) => {
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

const handlers = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        });
    },
  },
];

app.on('request', (req, res) => {
  handlers.forEach((routeHandler) => {
    if (routeHandler.route === req.url) {
      return routeHandler.handler(req, res);
    }
  });
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
