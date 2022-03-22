const MAX_PRICE = 100000;
export const form = document.querySelector('.ad-form');
const address = form.querySelector('#address');
const mapFilter = document.querySelector('.map__filters');
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const slider = form.querySelector('.ad-form__slider');
export const DEFAULT_LAT = 35.6825;
export const DEFAULT_LNG = 139.7521;
const minPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};
const roomOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const pristine = new Pristine(form, {
  classTo : 'form-item',
  errorTextParent: 'form-item',
  errorTextClass: 'form-item__error',
  errorTextTag: 'div',
  successClass: 'form-item--valid',
  errorClass: 'form-item--invalid',
});

// Функции перевода страницы в активное и неактивное состояние
export const deactivatePage = () => {
  form.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
};

export const activatePage = () => {
  form.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
};

// Валидация количества комнат и гостей
const validateRooms = () => roomOptions[roomsField.value].includes(capacityField.value);

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
  }};

roomsField.addEventListener('change', () => {
  pristine.validate(capacityField);
});

pristine.addValidator(capacityField, validateRooms, getRoomsErrorMessage);

// Слайдер для указания цены жилья
noUiSlider.create(slider, {
  range: {
    'min': 0,
    'max': 100000,
  },
  start: 0,
  step: 100,
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
const validatePrice = (value) => value >= minPrice[typeField.value] && value <= MAX_PRICE;
const getPriceErrorMessage = () => priceField.value > MAX_PRICE ?
  `Максимальная цена: ${MAX_PRICE}` :
  `Минимальная цена: ${minPrice[typeField.value]}`;

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const setPriceRange = (type, price) => {
  price.min = minPrice[type.value];
  price.placeholder =  minPrice[type.value];
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
const timeSync  = (first, second) => {
  second.value = first.value;
};

timeIn.addEventListener('change', () => {
  timeSync (timeIn, timeOut);
});

timeOut.addEventListener('change', () => {
  timeSync (timeOut, timeIn);
});

// Валидация отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// Ввод значения поля адресс в форму
address.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
export const getAddress = (evt) => {
  const coordinate = evt.target.getLatLng();
  const lat = coordinate.lat;
  const lng = coordinate.lng;
  address.value = `${lat.toFixed(5)} , ${lng.toFixed(5)}`;
};
