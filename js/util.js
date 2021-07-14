function checkStringLength (string, length) {
  return string.length <= length;
}

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function getRandomArrayElements(elements) {
  return elements[Math.floor(Math.random()*elements.length)];
}
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const dublicates = (array) => {
  array = array.map((evt) => evt.toLowerCase());
  return (new Set(array)).size !== array.length;
};
export {checkStringLength, getRandomPositiveInteger, getRandomArrayElements, isEscEvent, dublicates};
