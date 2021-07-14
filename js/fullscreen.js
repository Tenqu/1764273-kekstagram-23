import { isEscEvent } from './util.js';
import './thumbnails.js';
import { imgArray } from './data.js';
const bigPictureModalElement = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img > img');
const bigPictureModalOpenElement = document.querySelector('.pictures');
const bigPictureModalCloseElement = document.querySelector('.big-picture__cancel');
const commentsLoaderButton = document.querySelector('.comments-loader');
const commentsListElements = document.querySelector('.social__comments');
const socialCommentCount = document.querySelector('.social__comment-count');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const onBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};
const showComment = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  const commentImg = document.createElement('img');
  const commentText = document.createElement('p');
  commentElement.classList.add('social__comment');
  commentImg.classList.add('social__picture');
  commentText.classList.add('social__text');
  commentImg.src = avatar;
  commentImg.alt = name;
  commentImg.width = 35;
  commentImg.height = 35;
  commentText.textContent = message;
  commentElement.appendChild(commentImg);
  commentElement.appendChild(commentText);
  commentsListElements.appendChild(commentElement);
};
const showComments = (comments) => comments.forEach(showComment);
let currentComments = [];
const showAllComments = () => {
  const allSocialComments = commentsListElements.querySelectorAll('.social__comment').length;
  showComments(currentComments.slice(allSocialComments, allSocialComments + 5));
  const numberOfComment = commentsListElements.querySelectorAll('.social__comment').length;
  if (numberOfComment === currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
  socialCommentCount.textContent = `${numberOfComment} из ${currentComments.length} комментариев`;
};
function openBigPictureModal () {
  bigPictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  commentsLoaderButton.addEventListener('click', showAllComments);
}
function closeBigPictureModal () {
  bigPictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoaderButton.removeEventListener('click', showAllComments);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureModalCloseElement.removeEventListener('click', closeBigPictureModal);
}

const showBigPicture = (array) => {
  const bigPicture = (element) => {
    bigPictureImg.src = element.url;
    likesCount.textContent = element.likes;
    commentsCount.textContent = element.comments.length;
    socialCaption.textContent = element.descriptions;
    commentsListElements.innerHTML = '';
    currentComments = element.comments;
    showAllComments(element.comments);
  };
  bigPictureModalOpenElement.addEventListener('click', (evt) => {
    const dataClickImage = evt.target.getAttribute('data-image');
    const target = evt.target;
    const ignoreTarget = document.querySelector('.img-upload');
    if (target === ignoreTarget || ignoreTarget.contains(target)) {
      return;
    }
    openBigPictureModal();
    const elementOfMassive = array[dataClickImage];
    bigPicture(elementOfMassive);
    document.addEventListener('keydown', onBigPictureEscKeydown);
    bigPictureModalCloseElement.addEventListener('click', closeBigPictureModal);
  });
};
showBigPicture(imgArray);
