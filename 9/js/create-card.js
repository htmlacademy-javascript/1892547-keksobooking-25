import {generateAds}  from './generate-ads.js';

const TRANSLATIONS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
export const cards = generateAds(10);

const createFeatures = (features) => {
  const container = document.createDocumentFragment();

  for (const feature of features) {
    const li = document.createElement('li');
    li.className = `popup__feature popup__feature--${feature}`;
    container.append(li);
  }
  return container;

};

const createPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  for (const src of photos) {
    const image = document.createElement('img');
    image.className = 'popup__photo';
    image.src = src;
    image.width= '45';
    image.height= '40';
    image.alt= 'Фотография жилья';
    photosFragment.append(image);
  }
  return photosFragment;

};

export const createCard = ({offer, author}) => {
  const offerCard = offerCardTemplate.cloneNode(true);
  const popupTitle = offerCard.querySelector('.popup__title');
  popupTitle.textContent = offer.title;
  const popupAdress = offerCard.querySelector('.popup__text--address');
  popupAdress.textContent = offer.address;
  const popupPrice = offerCard.querySelector('.popup__text--price');
  popupPrice.textContent = `${offer.price} ₽/ночь`;
  const popupType = offerCard.querySelector('.popup__type');
  popupType.textContent = TRANSLATIONS[offer.type];
  const popupCapacity = offerCard.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  const popupTime = offerCard.querySelector('.popup__text--time');
  popupTime.textContent =`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const popupFeatures = offerCard.querySelector('.popup__features');

  if (!offer.features) {
    popupFeatures.remove();
  } else {
    popupFeatures.append(createFeatures(offer.features));
  }

  const popupDescription = offerCard.querySelector('.popup__description');

  if (!offer.description) {
    popupDescription.remove();
  } else {
    popupDescription.textContent = offer.description;
  }

  const popupPhotos = offerCard.querySelector('.popup__photos');

  if (!offer.photos) {
    popupPhotos.remove();
  } else {
    popupPhotos.append(createPhotos(offer.photos));
  }

  const popupAvatar = offerCard.querySelector('.popup__avatar');
  popupAvatar.src = author.avatar;

  return offerCard;
};
