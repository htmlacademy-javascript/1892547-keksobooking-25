import {activatePage, deactivatePage} from './util.js';
import {form} from './form.js';
import {cards, createCard} from './create-card.js';

const DEFAULT_LAT = 35.6825;
const DEFAULT_LNG = 139.7521;

deactivatePage();

// Создание карты и настройка. Активация страницы при инициализации карты.
const map = L.map('map-canvas')
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, 13)
  .on('load', activatePage());

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
const address = form.querySelector('#address');
address.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;

mainPin.on('moveend', (evt) => {
  const coordinate = evt.target.getLatLng();
  const lat = coordinate.lat;
  const lng = coordinate.lng;
  address.value = `${lat.toFixed(5)} , ${lng.toFixed(5)}`;
});

// Создание группы меток с балунами. Отображение их на карте
const markerGroup = L.layerGroup().addTo(map);

const createMarker = (card) => {
  const adPin = L.marker(
    card.location,
    {
      draggable: true,
      icon: adPinIcon,
    },
  );
  adPin
    .addTo(markerGroup)
    .bindPopup(createCard(card));
};

cards.forEach((offer) => {
  createMarker(offer);
});

// подготовка для будущей фильтрации
// markerGroup.clearLayers();
// cards.slice(cards.length / 2).forEach((card) => {
//   createMarker(card);
// });
