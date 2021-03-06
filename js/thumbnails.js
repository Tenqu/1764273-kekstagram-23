const similarListPictures = document.querySelector('.pictures');
const picturesDescriptionsTemplate = document.querySelector('#picture')
  .content;
const similarPicturesFragment = document.createDocumentFragment();
const createPictureDescriptions = (similarElements) => {
  similarElements.forEach(({url, likes, comments, id}) => {
    const pictureElement = picturesDescriptionsTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__img').dataset.id = id;
    similarPicturesFragment.appendChild(pictureElement);
  });
  similarListPictures.appendChild(similarPicturesFragment);
};
export {createPictureDescriptions};
