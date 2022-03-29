import {
  deactivatePage,
  activatePage,
  setAdress,
  setUserFormSubmit,
  onButtonReset,
} from './form.js';
import { createCard } from './create-card.js';
import { getData } from './api.js';

const DEFAULT_LAT = 35.6825;
const DEFAULT_LNG = 139.7521;
const MAX_ADS = 10;

deactivatePage();

// Создание карты и настройка. Активация страницы при инициализации карты.
const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
    setAdress(DEFAULT_LAT, DEFAULT_LNG);
  })
  .setView(
    {
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    },
    13
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

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
  }
);
mainPin.addTo(map);

// Функция сброса карты к настройкам по-умолчанию
const resetMap = () => {
  map
    .setView(
      {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG,
      },
      13
    )
    .closePopup();
  setAdress(DEFAULT_LAT, DEFAULT_LNG);
  mainPin.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
};

// Ввод значения поля address в форму
mainPin.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  setAdress(lat, lng);
});

// Создание группы меток с балунами. Отображение их на карте
const markerGroup = L.layerGroup().addTo(map);

const createMarker = (card) =>
  L.marker(card.location, {
    icon: adPinIcon,
  });

const renderPins = (data) => {
  const pins = data.slice(0, MAX_ADS);
  pins.forEach((element) => {
    const adPin = createMarker(element);
    adPin.addTo(markerGroup).bindPopup(createCard(element));
  });
};

getData(renderPins);
setUserFormSubmit(resetMap);
onButtonReset(resetMap);

// подготовка для будущей фильтрации
// markerGroup.clearLayers();
// cards.slice(cards.length / 2).forEach((card) => {
//   createMarker(card);
// });
