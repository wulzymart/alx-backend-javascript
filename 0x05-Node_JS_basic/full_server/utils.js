import { readFile } from 'fs';

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
