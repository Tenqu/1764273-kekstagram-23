import { MAX_COMMENT_LENGTH, MAX_HASHTAG_AMOUNT } from './consts.js';
import {checkStringLength, hasDublicates} from './util.js';
const textHashtagsField = document.querySelector('.text__hashtags');
const textDescriptionField = document.querySelector('.text__description');
const re = /^#[A-Za-zА-ЯаЯ0-9]{1,19}$/;

const validateHashtags = () => {
  textHashtagsField.addEventListener('input', () => {
    let invalid = false;
    const hashtagsList = textHashtagsField.value.toLowerCase().split(' ');
    if (hashtagsList.length > MAX_HASHTAG_AMOUNT) {
      invalid = true;
      textHashtagsField.setCustomValidity(`Удалите лишние ${hashtagsList.length - MAX_HASHTAG_AMOUNT} хэштэга`);
      textHashtagsField.classList.add('error-input');
    }
    hashtagsList.forEach((hashtag) => {
      if (!re.test(hashtag)) {
        invalid = true;
        textHashtagsField.setCustomValidity('Хэштэг должен начинаться с #, состоять из букв и чисел, не может содержать спецсимволы.');
        textHashtagsField.classList.add('error-input');
      }
    });
    if (hasDublicates(hashtagsList)) {
      invalid = true;
      textHashtagsField.setCustomValidity('Хэштэг не должен повторяться.');
      textHashtagsField.classList.add('error-input');
    }
    if (!invalid) {
      textHashtagsField.setCustomValidity('');
      textHashtagsField.classList.remove('error-input');
    }
    textHashtagsField.reportValidity();
  });
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
