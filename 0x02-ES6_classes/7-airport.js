export default class Airport {
  constructor(name, code) {
    this._name = name;
    this._code = code;
  }

  get name() {
    return this._name;
  }

  set name(nme) {
    this._name = nme;
  }

  get code() {
    return this._code;
  }

  set code(cd) {
    this._code = cd;
  }

  toString() {
    return `[object ${this.code}]`;
  }
}
