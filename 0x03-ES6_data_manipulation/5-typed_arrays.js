export default function createInt8TypedArray(length, position, value) {
  if (position < 0 || position >= length) throw new Error('Position outside range');

  const buffer = new ArrayBuffer(length);
  const typedArr = new Int8Array(buffer, 0, length);
  typedArr.set([value], position);
  return new DataView(buffer);
}
