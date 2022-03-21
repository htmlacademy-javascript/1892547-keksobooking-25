const MAX_PRICE = 100000;
export const form = document.querySelector('.ad-form');
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
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
