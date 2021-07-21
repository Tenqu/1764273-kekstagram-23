const ALERT_SHOW_TIME = 5000;
function checkStringLength (string, length) {
  return string.length <= length;
}
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
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
let currentComments = [];
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
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomPositiveInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export {checkStringLength, clearComments, getCurrentComments, setCurrentComments, getRandomPositiveInteger, isEscEvent,  showAlert, setPosts, getPosts, debounce, shuffle };
