const ALERT_SHOW_TIME = 5000;

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
export const getRandomArrayElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];

// Возвращает сообщение об ошибке на странице
export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '8px 3px';
  alertContainer.style.fontSize = '27px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
