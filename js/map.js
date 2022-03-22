import {deactivatePage, activatePage, getAddress, DEFAULT_LAT, DEFAULT_LNG} from './form.js';
import {cards, createCard} from './create-card.js';

deactivatePage();

// Создание карты и настройка. Активация страницы при инициализации карты.
const map = L.map('map-canvas')
  .on('load', activatePage)
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPin = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPin.addTo(map);

// Ввод значения поля address в форму
mainPin.on('moveend', getAddress);

// Создание группы меток с балунами. Отображение их на карте
const markerGroup = L.layerGroup().addTo(map);

const createMarker = (card) => L.marker(
  card.location,
  {
    draggable: true,
    icon: adPinIcon,
  });

const createPinOnMap = (data) => {
  data.forEach((element) => {
    const adPin = createMarker(element);
    adPin
      .addTo(markerGroup)
      .bindPopup(createCard(element));
  });
};

createPinOnMap(cards);

// подготовка для будущей фильтрации
// markerGroup.clearLayers();
// cards.slice(cards.length / 2).forEach((card) => {
//   createMarker(card);
// });
