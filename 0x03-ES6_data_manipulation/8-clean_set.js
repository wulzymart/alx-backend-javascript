export default function cleanSet(set, startString) {
  if (startString === '' || !startString) return '';
  const list = [...set].filter((element) => (element ? element.startsWith(startString) : '')).map((element) => (element ? element.split(startString)[1] : ''));
  if (list.includes('')) return '';
  return list.join('-');
}
