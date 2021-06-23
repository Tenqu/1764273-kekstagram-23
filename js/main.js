const MAX_COMMENT_LENGTH = 140;
const PHOTO_DESCRIPTION_OPTIONS = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Илья',
  'Никита',
  'Александр',
  'Михаил',
  'Андрей',
];
function checkStringLength (string, length) {
  return string.length <= length;
}

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function getRandomArrayElements(elements) {
  return elements[Math.floor(Math.random()*elements.length)];
}
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
