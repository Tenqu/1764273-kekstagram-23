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
const hasDublicates = (array) => {
  array = array.map((evt) => evt.toLowerCase());
  return (new Set(array)).size !== array.length;
};
const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
let postsList;
let currentComments;
const getCurrentComments = () => currentComments;
const setCurrentComments = (comment) => {
  currentComments.push(comment);
};
const clearComments = () => {
  currentComments = [];
};
const setPosts = (posts) => {
  postsList = posts.slice();
};
const getPosts = () => postsList;
export {checkStringLength, clearComments, getCurrentComments, setCurrentComments, getRandomPositiveInteger, getRandomArrayElements, isEscEvent, hasDublicates, showAlert, setPosts, getPosts};
