import {PHOTO_DESCRIPTION_OPTIONS, MESSAGES, NAMES} from './consts.js';
import {getRandomPositiveInteger, getRandomArrayElements} from './util.js';
const createCommentObjects = () => ({
  id: getRandomPositiveInteger(1, 100),
  avatar: `img/avatar-${  getRandomPositiveInteger(1, 6)  }.svg`,
  message: getRandomArrayElements(MESSAGES),
  name: getRandomArrayElements(NAMES),
});
const createObject = () => ({
  id: getRandomPositiveInteger(1, 25),
  url: `photos/${  getRandomPositiveInteger(1, 25)  }.jpg`,
  description: 'Сказочное Бали',
  likes: getRandomPositiveInteger(15, 200),
  comments: new Array(getRandomPositiveInteger(1, 4)).fill(null).map(() => createCommentObjects()),
});
const photoDescriptions = new Array(PHOTO_DESCRIPTION_OPTIONS).fill(null).map(() => createObject());
export {createCommentObjects, createObject, photoDescriptions};
