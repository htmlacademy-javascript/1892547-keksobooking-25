import { getRandomNumber, getRandomFloat, getRandomArrayElement } from './util';

const MIN_PRICE = 1;
const MAX_PRICE = 30000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const FLOAT = 5;
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createAd = (i) => {
  const id = `${i}`.padStart(2, '0');
  const location = {
    lat: getRandomFloat(MIN_LAT, MAX_LAT, FLOAT),
    lng: getRandomFloat(MIN_LNG, MAX_LNG, FLOAT),
  };

  return {
    autor: {
      avatar: `img/avatars/user${id}.png`
    },
    location,
    offer: {
      title: 'Заголовок предложения',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: FEATURES.slice(0, getRandomNumber(1, FEATURES.length)),
      description: 'Описание помещения',
      photos: PHOTOS.slice(0, getRandomNumber(1, PHOTOS.length)),
    }
  };
};

const generateAds = (maxAds) =>  Array.from({length: maxAds}, (_item, index) => createAd(index + 1));

generateAds();
