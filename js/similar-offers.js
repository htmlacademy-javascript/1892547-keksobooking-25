import { generateAds } from './generate-ads.js';

const offersData = generateAds(1);
const offerCardTemplate = document.querySelector('#card').content;
const similarOffersFragmet = document.createDocumentFragment();
const mapCanvas = document.querySelector('#map-canvas');

offersData.forEach((card) => {
  const offerCard = offerCardTemplate.cloneNode(true);
  offerCard.querySelector('.popup__title').innerHTML = card.offer.title;
  offerCard.querySelector('.popup__text--address').innerHTML =
    card.offer.address;
  offerCard.querySelector(
    '.popup__text--price'
  ).innerHTML = `${card.offer.price} ₽/ночь`;

  const translations = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель'
  };

  offerCard.querySelector('.popup__type').innerHTML =
    translations[card.offer.type];

  offerCard.querySelector(
    '.popup__text--capacity'
  ).innerHTML = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  offerCard.querySelector(
    '.popup__text--time'
  ).innerHTML = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  const featuresContainer = offerCard.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');
  const featureItems = card.offer.features;
  const modifiers = featureItems.map((feature) => `popup__feature--${feature}`);

  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });

  offerCard.querySelector('.popup__description').innerHTML =
    card.offer.description;

  const photosFragment = document.createDocumentFragment();
  const popupPhotos = offerCard.querySelector('.popup__photos');

  for (let i = 0; i < card.offer.photos.length; i++) {
    const photosTemplate = popupPhotos.children[0].cloneNode(true);
    photosTemplate.src = card.offer.photos[i];
    photosFragment.append(photosTemplate);
  }

  popupPhotos.innerHTML = '';
  popupPhotos.append(photosFragment);

  offerCard.querySelector('.popup__avatar').src = card.autor.avatar;

  similarOffersFragmet.appendChild(offerCard);
});

mapCanvas.appendChild(similarOffersFragmet);
