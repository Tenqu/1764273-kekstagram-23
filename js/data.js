import {MESSAGES, NAMES, PHOTO_DESCRIPTION_OPTIONS} from './consts.js';
import {getRandomPositiveInteger, getRandomArrayElements} from './util.js';
const createCommentObjects = () => ({
  id: getRandomPositiveInteger(1, 100),
  avatar: `img/avatar-${  getRandomPositiveInteger(1, 6)  }.svg`,
  message: getRandomArrayElements(MESSAGES),
  name: getRandomArrayElements(NAMES),
});
const createPhotoDescriptions = (numberOfDescriptions) => {
  const photoDescriptions = [];
  const createSingleElement = () => {
    let randomId = getRandomPositiveInteger(1, 25);
    while (photoDescriptions.find((item) => item.id === randomId)) {
      randomId = getRandomPositiveInteger(1,25);
    }
    return {
      id: randomId,
      url: `photos/${  randomId  }.jpg`,
      description: 'Сказочное Бали',
      likes: getRandomPositiveInteger(15, 200),
      comments: new Array(getRandomPositiveInteger(1, 7)).fill(null).map(() => createCommentObjects()),
    };
  };
  while (photoDescriptions.length < numberOfDescriptions) {
    photoDescriptions.push(createSingleElement());
  }
  return photoDescriptions;
};
const imgArray = createPhotoDescriptions(PHOTO_DESCRIPTION_OPTIONS);
export {imgArray};
