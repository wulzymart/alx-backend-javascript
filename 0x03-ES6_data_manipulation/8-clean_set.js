export default function cleanSet(set, startString) {
  return (startString === '' || !startString) ? ''
    : [...set].filter((element) => element.startsWith(startString)).map((element) => element.split(startString)[1]).join('-');
}
