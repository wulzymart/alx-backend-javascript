export default class HolbertonCourse {
  constructor(name, length, students) {
    if (typeof name !== 'string') throw new TypeError('Name must be a string');
    if (!Number.isInteger(length)) throw new TypeError('Length must be a number');
    if (!Array.isArray(students)) throw new TypeError('Students type must be an Array');

    this._name = name;
    this._length = length;
    this._students = students;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== 'string') throw new TypeError('Name must be a string');
    this._name = value;
  }

  get length() {
    return this._length;
  }

  set length(value) {
    if (!Number.isInteger(value)) throw new TypeError('Length must be a number');
    this._length = value;
  }

  get students() {
    return this._students;
  }

  set students(value) {
    if (!Array.isArray(value)) throw new TypeError('Students type must be an Array');
    this._students = value;
  }
}
