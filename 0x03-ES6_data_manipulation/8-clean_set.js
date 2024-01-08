export default function cleanSet(set, startString) {
  if (startString === '' || !startString) return '';
  return [...set].filter((element) => element.startsWith(startString)).map((element) => (element.slice(startString.length))).join('-');
}
