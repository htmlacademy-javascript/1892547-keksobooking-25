import { sendData } from './api.js';
import { resetMap, DEFAULT_LAT, DEFAULT_LNG } from './map.js';
import { showMessage, successTemplate, errorTemplate } from './dialogs.js';
import { clearImages } from './photos.js';

const MAX_PRICE = 100000;
const SLIDER_START = 0;
const SLIDER_STEP = 100;
const SLIDER_RANGE = {
  min: 0,
  max: 100000,
};
const form = document.querySelector('.ad-form');
const address = form.querySelector('#address');
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const slider = form.querySelector('.ad-form__slider');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');
const minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};
const roomOptions = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const pristine = window.Pristine(form, {
  classTo: 'form-item',
  errorTextParent: 'form-item',
  errorTextClass: 'form-item__error',
  errorTextTag: 'div',
  successClass: 'form-item--valid',
  errorClass: 'form-item--invalid',
});

// Валидация количества комнат и гостей
const validateRooms = () =>
  roomOptions[roomsField.value].includes(capacityField.value);

const getRoomsErrorMessage = () => {
  switch (roomsField.value) {
    case '1':
      return 'Только для 1 гостя';

    case '2':
      return 'Только для 1 или 2 гостей';

    case '3':
      return 'Только для гостей';

    case '100':
      return 'Не для гостей';
  }
};

roomsField.addEventListener('change', () => {
  pristine.validate(capacityField);
});

pristine.addValidator(capacityField, validateRooms, getRoomsErrorMessage);

// Слайдер для указания цены жилья
noUiSlider.create(slider, {
  range: SLIDER_RANGE,
  start: SLIDER_START,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return value;
    },
  },
});

// Валидация типа жилья и цен
const validatePrice = (value) =>
  value >= minPrice[typeField.value] && value <= MAX_PRICE;
const getPriceErrorMessage = () =>
  priceField.value > MAX_PRICE
    ? `Максимальная цена: ${MAX_PRICE}`
    : `Минимальная цена: ${minPrice[typeField.value]}`;

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const setPriceRange = (type, price) => {
  price.min = minPrice[type.value];
  price.placeholder = minPrice[type.value];
  price.max = MAX_PRICE;
};

const onTypeChange = () => {
  setPriceRange(typeField, priceField);
  pristine.validate(priceField);
};

typeField.addEventListener('change', () => {
  onTypeChange();
});

priceField.addEventListener('input', () => {
  slider.noUiSlider.set(priceField.value);
});

slider.noUiSlider.on('slide', () => {
  priceField.value = slider.noUiSlider.get();
  pristine.validate(priceField);
});

// Валидация времени заезда/выезда
const timeSync = (first, second) => {
  second.value = first.value;
};

timeIn.addEventListener('change', () => {
  timeSync(timeIn, timeOut);
});

timeOut.addEventListener('change', () => {
  timeSync(timeOut, timeIn);
});

// Активация / деактивация формы и фильтров
export function toggleFormDisabled (adForm, isDisabled) {
  adForm.classList.toggle('ad-form--disabled', isDisabled);
}

export function toggleMapFiltersDisabled (mapFilter, isDisabled) {
  mapFilter.classList.toggle('map__filters--disabled', isDisabled);
}

// Ввод значения поля адресс в форму
export function setAdress (lat, lng, addressField) {
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

// Валидация отправки формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  form.reset();
  clearImages();
  slider.noUiSlider.set(priceField.value);
  priceField.placeholder = minPrice[typeField.value];
  setAdress(DEFAULT_LAT, DEFAULT_LNG, address);
  resetMap();
};

const onAdSuccess = () => {
  resetForm();
  showMessage(successTemplate);
  unblockSubmitButton();
};

const onAdError = () => {
  showMessage(errorTemplate);
  unblockSubmitButton();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(
      onAdSuccess,
      onAdError,
      new FormData(evt.target)
    );
  }
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});
