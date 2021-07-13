import {imgArray} from './data.js';
const similarListPictures = document.querySelector('.pictures');
const picturesDescriptionsTemplate = document.querySelector('#picture')
  .content;
const similarPicturesFragment = document.createDocumentFragment();
const createPictureDescriptions = (similarElements) => {
  similarElements.forEach(({url, likes, comments}, i) => {
    const pictureElement = picturesDescriptionsTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__img').dataset.image = i;
    similarPicturesFragment.appendChild(pictureElement);
  });
  similarListPictures.appendChild(similarPicturesFragment);
};
createPictureDescriptions(imgArray);
