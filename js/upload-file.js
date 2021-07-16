import { MAX_COMMENT_LENGTH } from './consts.js';
import { activateEffect, deactivateEffect } from './slider.js';
import { dublicates, isEscEvent } from './util.js';
const uploadFileButton = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const textHashtagsField = document.querySelector('.text__hashtags');
const textDescriptionField = document.querySelector('.text__description');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview > img');
const MAX_HASHTAGS_COUNT = 5;
const re = /^#[A-Za-zА-ЯаЯ0-9]{1,19}$/;

const onImageEscKeydown = (evt) => {
  if (textHashtagsField === document.activeElement || textDescriptionField === document.activeElement) {
    return;
  }
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeImageModal();
  }
};
function closeTextDescription () {
  const valueLength = textDescriptionField.value.length;
  if (valueLength > MAX_COMMENT_LENGTH) {
    textDescriptionField.setCustomValidity('Удалите лишние символы');
  } else {
    textDescriptionField.setCustomValidity('');
  }
  textDescriptionField.reportValidity();
}
function closeHashtags () {
  const hashtagsArray = textHashtagsField.value.trim().split(' ').filter((tag) => tag);
  hashtagsArray.find((item) => {
    if (!re.test(item)) {
      textHashtagsField.setCustomValidity('Хэштэк должен начинаться с # и не может содержать спецсимволы');
      return textHashtagsField.reportValidity();
    } else if (dublicates(hashtagsArray)) {
      textHashtagsField.setCustomValidity('Нельзя добавлять одинаковые #');
      return textHashtagsField.reportValidity();
    } else if (hashtagsArray.length > 5) {
      textHashtagsField.setCustomValidity(MAX_HASHTAGS_COUNT);
      return textHashtagsField.reportValidity();
    } else {
      textHashtagsField.setCustomValidity('');
    }
    textHashtagsField.reportValidity();
  });
}

function openImageModal () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onImageEscKeydown);
  activateEffect();
}
function closeImageModal () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileButton.value = '';
  textDescriptionField.value ='';
  deactivateEffect();
  uploadCancelButton.removeEventListener('click', closeImageModal);
  textDescriptionField.removeEventListener('input', closeTextDescription);
  textHashtagsField.removeEventListener('input', closeHashtags);
  document.removeEventListener('keydown', onImageEscKeydown);
}
uploadFileButton.addEventListener('change', () => {
  const reader = new FileReader();
  reader.readAsDataURL(uploadFileButton.files[0]);
  reader.onload = () => {
    imgPreview.src = reader.result;
    openImageModal();
    textHashtagsField.addEventListener('input', closeHashtags);
    textDescriptionField.addEventListener('input', closeTextDescription);
    uploadCancelButton.addEventListener('click', closeImageModal);
  };
});
