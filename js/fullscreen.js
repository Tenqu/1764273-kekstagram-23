import { isEscEvent } from './util.js';
import './thumbnails.js';
import { imgArray } from './data.js';
const bigPictureModalElement = document.querySelector('.big-picture');
const bigPictureModalOpenElement = document.querySelector('.pictures');
const bigPictureModalCloseElement = document.querySelector('.big-picture__cancel');
const onBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};
function openBigPictureModal () {
  bigPictureModalElement.classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

}
function closeBigPictureModal () {
  bigPictureModalElement.classList.add('hidden');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
  bigPictureModalCloseElement.removeEventListener('click', closeBigPictureModal);
}
const showBigPicture = (array) => {
  const bigPicture = (element) => {
    document.querySelector('.big-picture__img > img').src = element.url;
    document.querySelector('.likes-count').textContent = element.likes;
    document.querySelector('.comments-count').textContent = element.comments;
    document.querySelector('.social__caption').textContent = element.descriptions;

    const commentsListElements = document.querySelector('.social__comments');
    const socialComments = document.querySelectorAll('.social__comments > li');
    socialComments.forEach((item) => item.remove);
    for (let i = 0; i < element.comments.length; i++) {
      const li = document.createElement('li');
      li.classList.add('social__comment');
      const img = document.createElement('img');
      img.classList.add('social__picture');
      img.src = element.comments[i].avatar;
      img.alt = element.comments[i].name;
      img.width = 35;
      img.height = 35;
      li.appendChild(img);
      const p = document.createElement('p');
      p.classList.add('social__text');
      p.textContent = element.comments[i].message;
      li.appendChild(p);
      commentsListElements.appendChild(li);
    }
  };
  bigPictureModalOpenElement.addEventListener('click', (evt) => {
    const dataClickImage = evt.target.getAttribute('data-image');

    openBigPictureModal();
    const elementOfMassive = array[dataClickImage];
    bigPicture(elementOfMassive);
    document.addEventListener('keydown', onBigPictureEscKeydown);
    bigPictureModalCloseElement.addEventListener('click', closeBigPictureModal);
  });
};
showBigPicture(imgArray);
