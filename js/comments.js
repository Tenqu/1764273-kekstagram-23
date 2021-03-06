import { getCurrentComments, setCurrentComments } from './util.js';
const MAX_COMMENTS = 5;
const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsCount = document.querySelector('.social__comment-count');
const onCommentsLoad = document.querySelector('.comments-loader');


const updateCounter = (count) => commentsCount.firstChild.textContent = `${count} из `;
const showPartComments = (comments) => {
  const counter = Math.min(comments.length, MAX_COMMENTS);
  for (let i=0; i < counter; i++) {
    onCommentsLoad.classList.remove('hidden');
    commentsList.append(comments[i]);
  }
  comments.splice(0, MAX_COMMENTS);
  if (!comments.length) {
    onCommentsLoad.classList.add('hidden');
  }
};
const showMoreComments = () => {
  showPartComments(getCurrentComments());
  updateCounter(commentsList.childElementCount);
};
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
onCommentsLoad.addEventListener('click', showMoreComments);

export {getComments};
