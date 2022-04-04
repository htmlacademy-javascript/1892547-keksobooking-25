import { createCard } from './create-card.js';
import { toggleAdFormDisabled, toggleMapFiltersDisabled, setAdress, mapFilters} from './form.js';
import { filterData } from './filters.js';
import { getData } from './api.js';
import { getAds, setAds } from './get-ads.js';
import { showAlert } from './dialogs.js';

export const DEFAULT_LAT = 35.6825;
export const DEFAULT_LNG = 139.7521;
const MAX_ADS = 10;
const ZOOM = 13;

toggleMapFiltersDisabled(true);

// Создание карты и настройка. Активация страницы при инициализации карты.
const map = L.map('map-canvas');

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


// Ввод значения поля address в форму
mainPin.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  setAdress(lat, lng);
});

// Создание группы меток с балунами. Отображение их на карте
const markerGroup = L.layerGroup().addTo(map);

export const clearMarkers = () => {
  markerGroup.clearLayers();
};


const createMarker = (card) =>
  L.marker(card.location, {
    icon: adPinIcon,
  });

export const renderPins = (data) => {
  const pins = filterData(data).slice(0, MAX_ADS);
  pins.forEach((element) => {
    const adPin = createMarker(element);
    adPin.addTo(markerGroup).bindPopup(createCard(element));
  });
};

// Функция сброса карты к настройкам по-умолчанию
export const resetMap = () => {
  map
    .setView(
      {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG,
      },
      ZOOM
    )
    .closePopup();
  mainPin.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  mapFilters.reset();
  clearMarkers();
  renderPins(getAds());
};

const onGetDataSuccess = (data) => {
  setAds(data);
  renderPins(data);
  toggleMapFiltersDisabled(false);
};

map.on('load', () => {
  getData(onGetDataSuccess, showAlert);
  setAdress(DEFAULT_LAT, DEFAULT_LNG);
  toggleAdFormDisabled(false);
})
  .setView(
    {
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    },
    ZOOM
  );
