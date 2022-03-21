
// Возвращает случайное целое число из переданного диапазона включительно.
export const getRandomNumber = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

// Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
export const getRandomFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

// Вовзращает случайный элемент массива
export const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// Функции перевода страницы в активное и неактивное состояние
const mapFilter = document.querySelector('.map__filters');
const form = document.querySelector('.ad-form');

export const deactivatePage = () => {
  form.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
};

export const activatePage = () => {
  form.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
};
