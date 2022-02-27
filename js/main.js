const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const SIMILAR_AD_COUNT = 10;

// Возвращает случайное целое число из переданного диапазона включительно.
const getRandomNumber = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

// Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)]; // Вовзращает случайный элемент массива

const usersId = Array.from({ length: SIMILAR_AD_COUNT }, (v, i) => ++i); // Генерирует последовательность чисел от 1 до SIMILAR_AD_COUNT

const getRandomLengthArr = (array) => {
  const newArr = [];
  const count = getRandomNumber(1, array.length);
  for (let i = 0; i < count; i++) {
    newArr.push(array[i]);
  }
  return newArr;
};

const getAutor = (i) => ({
  avatar: `img/avatars/user${usersId[i]}.png`,
});

const getLocation = () => ({
  lat: getRandomFloat(35.65, 35.7, 5),
  lng: getRandomFloat(139.7, 139.8, 5),
});

const getOffer = () => ({
  title: 'Заголовок предложения',
  address: `${getLocation().lat}, ${getLocation().lng}`,
  price: getRandomNumber(1, 30000),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomNumber(1, 5),
  guests: getRandomNumber(1, 8),
  checkin: getRandomArrayElement(TIME),
  checkout: getRandomArrayElement(TIME),
  features: getRandomLengthArr(FEATURES),
  description: 'Описание помещения',
  photos: getRandomLengthArr(PHOTOS),
});

const generateAds = () => {
  const ads = [];
  for (let i = 0; i < SIMILAR_AD_COUNT; i++) {
    const location = getLocation();
    ads.push({
      autor: getAutor(i),
      offer: getOffer(),
      location,
    });
  }
  return ads;
};

generateAds();

/* Создаем массив из случайных уникальных ID длиной
const getUniqueImgNumber = () => {
  const imgNumber = usersId.splice(getRandomNumber(0, (usersId.length -1 )), 1);
  return imgNumber < 10 && imgNumber > 0 ? `0${imgNumber}` : `${imgNumber}`;
};

const randomUsersId = [];

for (let i = 0; i < SIMILAR_AD_COUNT; i++) {
  const k = getUniqueImgNumber();
  randomUsersId.push(k);
}
*/
