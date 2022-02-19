// Возвращает случайное целое число из переданного диапазона включительно.
function getRandomNumber (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min <= max && min >= 0) {
    return Math.round(Math.random() * (max - min) + min);
  }
}

getRandomNumber();

//  Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
function getRandomFloat (min, max, fractionDigits) {
  if (min <= max && min >= 0) {
    const fractionMultiplier = Math.pow(10, fractionDigits);
    return Math.round((Math.random() * (max- min) + min) * fractionMultiplier) / fractionMultiplier;
  }
}

getRandomFloat();
