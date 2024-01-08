export default function hasValuesFromArray(set, list) {
  const setFromList = new Set(list);
  for (const elem of setFromList) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}
