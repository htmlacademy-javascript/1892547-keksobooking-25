const form = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const address = form.querySelector('#address');

// Активация / деактивация формы и фильтров
export const toggleFormDisabled = (isDisabled) => {
  form.classList.toggle('ad-form--disabled', isDisabled);
  mapFilter.classList.toggle('map__filters--disabled', isDisabled);
};

// Ввод значения поля адресс в форму
export const setAdress = (lat, lng) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};
