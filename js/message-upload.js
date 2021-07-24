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
const onSuccessMessageClick = (evt) => {
  if (evt.target.classList.contains('success')) {
    successMessage.remove();
  }
};
const closeSuccessMessage = () => {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessMessageEsc);
  document.removeEventListener('click', onSuccessMessageClick);
};
const showSuccessMessage = () => {
  document.querySelector('body').append(successMessage);
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEsc);
  document.addEventListener('click', onSuccessMessageClick);
};
const onErrorMessageEsc = (evt) => {
  if (isEscEvent(evt)) {
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorMessageEsc);
  }
};
const onErrorMessageClick = (evt) => {
  if (evt.target.classList.contains('error')) {
    errorMessage.remove();
  }
};
const onCloseErrorMessageCLick = () => {
  errorMessage.remove();
  document.removeEventListener('keydown', onErrorMessageEsc);
  document.removeEventListener('click', onErrorMessageClick);
};
const showErrorMessage = () => {
  document.querySelector('body').append(errorMessage);
  errorButton.addEventListener('click', onCloseErrorMessageCLick);
  document.addEventListener('keydown', onErrorMessageEsc);
  document.addEventListener('click', onErrorMessageClick);
};
export {showSuccessMessage, showErrorMessage};
