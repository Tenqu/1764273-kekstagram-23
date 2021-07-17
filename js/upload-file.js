import { getData, sendData } from './api.js';
import { createPictureDescriptions } from './thumbnails.js';
import { setPosts, showAlert, isEscEvent } from './util.js';
import { showBigPicture } from './fullscreen.js';
import { activateScale, deactivateScale } from './scale-control.js';
import { activateEffect, deactivateEffect } from './slider-effect.js';
import { validateHashtags, validateComments } from './validation.js';
import { showSuccessMessage, showErrorMessage } from './message-upload.js';
const imgUpload = document.querySelector('.img-upload');
const picturesList = document.querySelector('.pictures');
const fileUploader = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const imgUploadForm = document.querySelector('.img-upload__form');
const cancelButton = imgUploadForm.querySelector('#upload-cancel');
const imgOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const hashtagInput =  imgUploadForm.querySelector('.text__hashtags');
const commentText = imgUploadForm.querySelector('.text__description');
const effectNone = imgUploadForm.querySelector('#effect-none');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMG_URL = 'img/upload-default-image.jpg';

const startUploader = () => {
  fileUploader.addEventListener('change', () => {
    const file = fileUploader.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};
const resetInputs = () => {
  preview.src = DEFAULT_IMG_URL;
  fileUploader.value = '';
  hashtagInput.value ='';
  commentText.value = '';
  effectNone.checked = true;
};
function closeUploadEsc(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    imgOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    resetInputs();
    deactivateScale();
    deactivateEffect();
    document.removeEventListener('keydown', closeUploadEsc);
    cancelButton.removeEventListener('click', closeUpload);
  }
}
function closeUpload() {
  imgOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetInputs();
  deactivateScale();
  deactivateEffect();
  document.removeEventListener('keydown', closeUploadEsc);
  cancelButton.removeEventListener('click', closeUpload);
}

const openUpload = () => {
  imgOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', closeUploadEsc);
  cancelButton.addEventListener('click', closeUpload);
  activateScale();
  activateEffect();
  validateHashtags();
  validateComments();
  startUploader();
};
const startsForm = () => {
  fileUploader.addEventListener('click', () => {
    openUpload();
  });
};

hashtagInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

commentText.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const onSuccess = () => {
  closeUpload();
  showSuccessMessage();
};

const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    sendData(onSuccess, showErrorMessage, formData);
  });
};
setUserFormSubmit(onSuccess);

const getContent = () => {
  getData(showAlert).then((posts) => {
    createPictureDescriptions(posts);
    setPosts(posts);
    picturesList.addEventListener('click', (evt) => {
      const findPicture = (element) => {
        if (element.id === Number(evt.target.dataset.id)) {
          return element;
        }
      };
      showBigPicture(posts.find(findPicture));
    });
  });
};

imgUpload.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

export {startsForm, getContent};
