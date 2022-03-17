const form = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const roomsField = form.querySelector('#room_number');
const capacityField = form.querySelector('#capacity');
const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const pristine = new Pristine(form, {
  classTo : 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
});

const validateRooms = () => roomsOption[roomsField.value].includes(capacityField.value);

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const inactivatePage = () => {
  form.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
};

const activatePage = () => {
  form.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
};

inactivatePage();
activatePage();
