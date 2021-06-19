const MAX_COMMENT_LENGTH = 140;
const getRandomPositiveInteger = function (min, max) {
  if (min >= max || min < 0) {
    return console.log('Ошибка в условии');
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
};
// https://learn.javascript.ru/task/random-int-min-max Формулу взял отсюда
getRandomPositiveInteger(0,10);

const checkMaxStringLength = (string, maxLength) => string <= maxLength;
checkMaxStringLength(140, MAX_COMMENT_LENGTH);
