// Возвращает случайное целое число из переданного диапазона включительно.
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min <= max && min >= 0) {
    return Math.floor( Math.random() * (max - min +1) + min );
  }
}

getRandomNumber();

/* Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
Преобразует значения переданного диапазона в корректный формат (0.123... => 0.1) */
function getRandomFloat(min, max, fractionDigits) {
  fractionDigits = Math.floor(fractionDigits);
  const fractionMultiplier = Math.pow(10, fractionDigits);
  min = Math.floor(min * 10) / 10;
  max = Math.floor(max * 10) / 10;

  if (
    min <= max &&
    min >= 0 &&
    fractionDigits >= 0
  ) {
    return Math.floor( (Math.random() * (max - min + 0.1) + min) * fractionMultiplier  ) / fractionMultiplier;
  }
}

getRandomFloat();
