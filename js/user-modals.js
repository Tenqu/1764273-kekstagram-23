import { isEscEvent, clearComments } from './util.js';
const cancelButton = document.querySelector('.big-picture__cancel');
const button = document.querySelector('.big-picture');
function closeModalEsc (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    button.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    clearComments();
    document.removeEventListener('keydown', closeModalEsc);
    cancelButton.removeEventListener('click', closeModal);
  }
}

function closeModal() {
  document.removeEventListener('keydown', closeModalEsc);
  cancelButton.removeEventListener('click', closeModal);
  button.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearComments();
}

const openModal = () => {
  button.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', closeModalEsc);
  cancelButton.addEventListener('click', closeModal);
};

export {openModal};
