import { MAX_COMMENT_LENGTH } from './consts.js';
import {checkStringLength} from './util.js';
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAGS_LENGTH = 20;
const textHashtagsField = document.querySelector('.text__hashtags');
const textDescriptionField = document.querySelector('.text__description');

const getUniqueHastags = (hashtags) => {
  let tempStr = '';
  for (let i = 0; i < hashtags.length; i++) {
    const curHashtagLowerCaseAndseparator = `${hashtags[i].toLowerCase()}_`;
    if(tempStr.indexOf(curHashtagLowerCaseAndseparator) !== -1) {
      return false;
    }
    tempStr += curHashtagLowerCaseAndseparator;
  }
  return true;
};

const validateHashtags = () => {
  const hashtagsInputValue = textHashtagsField.value;
  textHashtagsField.setCustomValidity('');
  if(hashtagsInputValue === '') {
    return false;
  }

  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  const hashtags = hashtagsInputValue.split(' ');
  if(hashtags.length > MAX_HASHTAGS_COUNT) {
    textHashtagsField.setCustomValidity('Нельзя указать больше пяти хэштегов');
    textHashtagsField.reportValidity();
    return false;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if(hashtags[i].length > MAX_HASHTAGS_LENGTH) {
      textHashtagsField.setCustomValidity('Хэштэг не может превышать 20 символов (включая #)');
      textHashtagsField.reportValidity();
      return false;
    }
    if(!re.test(hashtags[i])) {
      textHashtagsField.setCustomValidity('Хэштэг должен начинаться со знака #, не может содержать пробелы и спецсимволы');
      textHashtagsField.reportValidity();
      return false;
    }
  }
  if(!getUniqueHastags(hashtags)) {
    textHashtagsField.setCustomValidity('Хэштеги не должны повторяться');
  }
  textHashtagsField.reportValidity();
};

const validateComments = () => {
  textDescriptionField.removeAttribute('maxlength');
  textDescriptionField.addEventListener('input', () => {
    if (!checkStringLength(textDescriptionField.value, MAX_COMMENT_LENGTH)) {
      textDescriptionField.setCustomValidity(`Удалите лишние ${textDescriptionField.value.length - MAX_COMMENT_LENGTH} симв.`);
      textDescriptionField.classList.add('error-input');
    } else {textDescriptionField.setCustomValidity('');}
    textDescriptionField.reportValidity();
  });
};

export {validateHashtags, validateComments};
