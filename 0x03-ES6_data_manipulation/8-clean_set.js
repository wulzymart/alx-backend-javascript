export default function cleanSet(set, startString) {
  if (startString === '' || !startString) return '';
  return [...set].filter((element) => (element ? element.startsWith(startString) : '')).map((element) => (element ? element.slice(startString.length) : '')).join('-');
}
