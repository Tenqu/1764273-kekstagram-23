import {openModal} from './user-modals.js';
import {getComments} from './comments.js';

const showBigPicture = ({url, likes, comments, description}) => {
  openModal();
  document.querySelector('.big-picture__img').querySelector('img').src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  document.querySelector('.social__caption').textContent = description;
  getComments(comments);
};
export {showBigPicture};
