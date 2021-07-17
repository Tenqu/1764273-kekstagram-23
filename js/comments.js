import { getCurrentComments, setCurrentComments } from './util.js';
const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const MAX_VISIBLE_COUNT = 5;

const updateCounter = (count) => commentsCount.firstChild.textContent = `${count} из `;
const showPartComments = (comments) => {
  const counter = Math.min(comments.length, MAX_VISIBLE_COUNT);
  for (let i=0; i < counter; i++) {
    commentsLoader.classList.remove('hidden');
    commentsList.append(comments[i]);
  }
  comments.splice(0, MAX_VISIBLE_COUNT);
  if (!comments.length) {
    commentsLoader.classList.add('hidden');
  }
};
function downloadMore() {
  showPartComments(getCurrentComments());
  updateCounter(commentsList.childElementCount);
}
const getComments = (comments) => {
  commentsList.innerHTML = '';
  comments.forEach(({avatar, name, message}) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    setCurrentComments(comment);
  });
  showPartComments(getCurrentComments());
  updateCounter(commentsList.childElementCount);
};
commentsLoader.addEventListener('click', downloadMore);

export {getComments};
