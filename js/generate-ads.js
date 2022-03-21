import {getRandomNumber, getRandomFloat, getRandomArrayElement} from './util.js';

const MIN_PRICE= 1;
const MAX_PRICE= 30000;
const MIN_ROOMS= 1;
const MAX_ROOMS= 8;
const MIN_GUESTS= 1;
const MAX_GUESTS= 10;
const MIN_LAT= 35.65000;
const MAX_LAT= 35.70000;
const MIN_LNG= 139.70000;
const MAX_LNG= 139.80000;
const FLOAT= 5;
const TYPES= ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME= ['12:00', '13:00', '14:00'];
const FEATURES= ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS= [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const TITLES = [
  'Историческая вилла с садом рядом с Пизой',
  'Уютная студия с видом на парк',
  'Гостевой дом в коттэджном посёлке премиум класса',
  'Великолепная квартира в центре города',
  'Шикарное шале на берегу тихого озера'
];
const DESCRIPTIONS = [
  'Квартира находится в самом центре Тирасполя, в тихом уютном месте.',
  'Квартира сделана в стиле лофт .В спальне расположена две односпальный кровати который можно соединить и спать семейное паре 2 персоны , в гостиной диван на 1 персону',
  'Квартира расположена вблизи железнодорожного вокзала, рядом парк, продуктовый магазин, известный вино-коньячный завод KVINT, фирменный магазин осетрового комплекса «Акватир», который производит черную икру. Квартира маленькая, но имеется всё необходимое для комфортного размещения, всегда чисто!',
  'Сдается новая квартира в самом центре Кишинева!В непосредственной близости расположен центральный парк, торговые центры, супермаркеты, банки, рестораны, аптеки',
  'Я не знаю что еще тут написать, все равно тут будут потом реальные данные, так что пусть будет пока так.:)'
];

const createAd = (i) => {
  const id = `${i}`.padStart(2, '0');
  const location = {
    lat: getRandomFloat(MIN_LAT, MAX_LAT, FLOAT),
    lng: getRandomFloat(MIN_LNG, MAX_LNG, FLOAT),
  };

  return {
    author: {
      avatar: `img/avatars/user${id}.png`
    },
    location,
    offer: {
      title: TITLES[getRandomNumber(0, TITLES.length -1)],
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: FEATURES.slice(0, getRandomNumber(0, FEATURES.length)),
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length -1)],
      photos: PHOTOS.slice(0, getRandomNumber(0, PHOTOS.length)),
    }
  };
};

export const generateAds = (maxAds) =>  Array.from({length: maxAds}, (_item, index) => createAd(index + 1));
