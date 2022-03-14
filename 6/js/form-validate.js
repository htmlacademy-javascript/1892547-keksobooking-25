const form = document.querySelector('.ad-form');
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
  }
};

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage, 1, false);
pristine.addValidator(capacityField, validateRooms);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
