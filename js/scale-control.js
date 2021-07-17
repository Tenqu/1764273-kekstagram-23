const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');

let currentValue = MAX_VALUE;
scaleValue.value = `${currentValue}%`;

const setImageScale = (newScale) => {
  scaleValue.value = `${newScale}%`;
  imgPreview.style = `transform: scale(${newScale / MAX_VALUE})`;
  currentValue = newScale;
};
const onButtonSmaller = () => {
  if (currentValue > MIN_VALUE) {
    currentValue -= STEP_VALUE;
    setImageScale(currentValue);
  }
};
const onButtonBigger = () => {
  if (currentValue < MAX_VALUE) {
    currentValue += STEP_VALUE;
    setImageScale(currentValue);
  }
};
buttonSmaller.addEventListener('click', onButtonSmaller);
buttonBigger.addEventListener('click', onButtonBigger);
