import { generateAds } from './generate-ads.js';

const TRANSLATIONS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const offerCardTemplate = document.querySelector('#card').content;
const mapCanvas = document.querySelector('#map-canvas');
const cards = generateAds(10);

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

export const createCard = (data) => {
  const offerCard = offerCardTemplate.cloneNode(true);
  const popupTitle = offerCard.querySelector('.popup__title');
  popupTitle.textContent = data.offer.title;
  const popupAdress = offerCard.querySelector('.popup__text--address');
  popupAdress.textContent = data.offer.address;
  const popupPrice = offerCard.querySelector('.popup__text--price');
  popupPrice.textContent = `${data.offer.price} ₽/ночь`;
  const popupType = offerCard.querySelector('.popup__type');
  popupType.textContent = TRANSLATIONS[data.offer.type];
  const popupCapacity = offerCard.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  const popupTime = offerCard.querySelector('.popup__text--time');
  popupTime.textContent =`Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  const popupFeatures = offerCard.querySelector('.popup__features');

  if (!data.offer.features) {
    popupFeatures.remove();
  } else {
    popupFeatures.append(createFeatures(data.offer.features));
  }

  const popupDescription = offerCard.querySelector('.popup__description');

  if (!data.offer.description) {
    popupDescription.remove();
  } else {
    popupDescription.textContent = data.offer.description;
  }

  const popupPhotos = offerCard.querySelector('.popup__photos');

  if (!data.offer.photos) {
    popupPhotos.remove();
  } else {
    popupPhotos.append(createPhotos(data.offer.photos));
  }

  const popupAvatar = offerCard.querySelector('.popup__avatar');
  popupAvatar.src = data.autor.avatar;

  return offerCard;
};

const card = createCard(cards[0]);

mapCanvas.appendChild(card);
