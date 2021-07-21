import { isEscEvent } from './util.js';
const successMessage = document.querySelector('#success').content.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

const onSuccessMessageEsc = (evt) => {
  if (isEscEvent(evt)) {
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessMessageEsc);
  }
};
const closeSuccessMessageClick = (evt) => {
  if (evt.target.classList.contains('success')) {
    successMessage.remove();
  }
};
const closeSuccessMessage = () => {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessMessageEsc);
  document.removeEventListener('click', closeSuccessMessageClick);
};
const showSuccessMessage = () => {
  document.querySelector('body').append(successMessage);
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEsc);
  document.addEventListener('click', closeSuccessMessageClick);
};
const closeErrorMessageEsc = (evt) => {
  if (isEscEvent(evt)) {
    errorMessage.remove();
    document.removeEventListener('keydown', closeErrorMessageEsc);
  }
};
const closeErrorMessageClick = (evt) => {
  if (evt.target.classList.contains('error')) {
    errorMessage.remove();
  }
};
const closeErrorMessage = () => {
  errorMessage.remove();
  document.removeEventListener('keydown', closeErrorMessageEsc);
  document.removeEventListener('click', closeErrorMessageClick);
};
const showErrorMessage = () => {
  document.querySelector('body').append(errorMessage);
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', closeErrorMessageEsc);
  document.addEventListener('click', closeErrorMessageClick);
};
export {showSuccessMessage, showErrorMessage};
