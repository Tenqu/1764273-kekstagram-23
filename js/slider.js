import { effects } from './consts.js';
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const imgUpload = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview img');
const imgForm = document.querySelector('.img-upload__form');
let currentEffect;
imgUpload.classList.add('hidden');
const giveEffect = (effectName) => {
  const {
    options,
    filter,
    unit,
  } = effects[effectName];
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.off();
    sliderElement.noUiSlider.updateOptions(options);
  } else {
    noUiSlider.create(sliderElement, options);
  }
  imgUpload.classList.remove('hidden');
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    const value = unencoded[handle];
    valueElement.value = value;
    imgPreview.style.filter = `${filter}(${value}${unit})`;
  });
};
const destroyEffect = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.off();
    sliderElement.noUiSlider.destroy();
  }
  valueElement.value = '';
  imgPreview.style.filter = '';
  imgUpload.classList.add('hidden');
};
const changeEffect = (evt) => {
  currentEffect = evt.target.value;
  if (evt.target.matches('.effects__radio')) {
    imgPreview.className = '';
    imgPreview.classList.add(`.effects__preview--${  evt.target.value}`);
    if (currentEffect === 'none') {
      destroyEffect();
    } else {
      giveEffect(currentEffect);
    }
  }
};
const activateEffect = () => {
  currentEffect = 'none';
  imgPreview.classList.add('img-upload__preview');
  imgPreview.classList.add(`effects__preview--${  currentEffect}`);
  imgForm.addEventListener('change', changeEffect);
};
const deactivateEffect = () => {
  destroyEffect();
  imgPreview.classList.remove('img-upload__preview');
  imgPreview.classList.remove(`effects__preview--${  currentEffect}`);
  imgForm.removeEventListener('change', changeEffect);
};
export {activateEffect, deactivateEffect};
