import {getRandomNumber, getRandomFloat, getRandomArrayElement} from './util.js';
import {getData} from './data.js';

const data = getData();

const createAd = (i) => {
  const id = `${i}`.padStart(2, '0');
  const location = {
    lat: getRandomFloat(data.MIN_LAT, data.MAX_LAT, data.FLOAT),
    lng: getRandomFloat(data.MIN_LNG, data.MAX_LNG, data.FLOAT),
  };

  return {
    autor: {
      avatar: `img/avatars/user${id}.png`
    },
    location,
    offer: {
      title: 'Заголовок предложения',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(data.MIN_PRICE, data.MAX_PRICE),
      type: getRandomArrayElement(data.TYPES),
      rooms: getRandomNumber(data.MIN_ROOMS, data.MAX_ROOMS),
      guests: getRandomNumber(data.MIN_GUESTS, data.MAX_GUESTS),
      checkin: getRandomArrayElement(data.TIME),
      checkout: getRandomArrayElement(data.TIME),
      features: data.FEATURES.slice(0, getRandomNumber(1, data.FEATURES.length)),
      description: 'Описание помещения',
      photos: data.PHOTOS.slice(0, getRandomNumber(1, data.PHOTOS.length)),
    }
  };
};

const generateAds = (maxAds) =>  Array.from({length: maxAds}, (_item, index) => createAd(index + 1));

export {generateAds};

