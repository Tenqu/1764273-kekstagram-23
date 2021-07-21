import { createPictureDescriptions } from './thumbnails.js';
import { debounce, getPosts, shuffle } from './util.js';
const RANDOM_COUNT = 10;
const filterForm = document.querySelector('.img-filters__form');
const filterList = document.querySelector('.img-filters');
const filterButton = filterForm.querySelectorAll('.img-filters__button');

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};
const compareComments = (A, B) => {
  const commentA = A.comments.length;
  const commentB = B.comments.length;
  return commentB - commentA;
};
const activateFilter = () => {
  filterList.classList.remove('img-filters--inactive');
  const showDefault = () => {
    clearPictures();
    createPictureDescriptions(getPosts());
  };
  const showRandomPost = () => {
    clearPictures();
    const posts = getPosts().slice();
    shuffle(posts);
    const randomPost = posts.slice(0, RANDOM_COUNT);
    createPictureDescriptions(randomPost);
  };
  const showMoreDiscussed = () => {
    clearPictures();
    const moreDiscussed = getPosts().slice();
    moreDiscussed.sort(compareComments);
    createPictureDescriptions(moreDiscussed);
  };
  const changeFilter = (evt) => {
    const filterBtn = evt.target;
    switch (filterBtn.id) {
      case 'filter-default':
        showDefault();
        break;

      case 'filter-random':
        showRandomPost();
        break;

      case 'filter-discussed':
        showMoreDiscussed();
        break;
    }
  };
  const changeFilterButton = (evt) => {
    filterButton.forEach((button) => button.classList.toggle('img-filters__button--active', button === evt.target));
  };
  const debounceFilter = debounce(changeFilter);
  const changeView = (evt) => {
    changeFilterButton(evt);
    debounceFilter(evt);
  };
  filterForm.addEventListener('click', changeView);
};
export {activateFilter};
