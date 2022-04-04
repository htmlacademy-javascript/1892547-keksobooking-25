import { getAds } from './get-ads.js';
import { renderPins, clearMarkers } from './map.js';
import { debounce } from './util.js';

const FILTER_DELAY = 500;
const DEFAULT_VALUE = 'any';

const PriceLevels = {
  LOW: 10000,
  HIGH: 50000,
};

const ApartmentPrices = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high'
};
const mapFilters = document.querySelector('.map__filters');
const housingTypeFilter = mapFilters.querySelector('#housing-type');
const housingPriceFilter = mapFilters.querySelector('#housing-price');
const housingRoomsFilter = mapFilters.querySelector('#housing-rooms');
const housingGuestsFilter = mapFilters.querySelector('#housing-guests');
const housingFeaturesFilter = mapFilters.querySelector('#housing-features');


const filterByType = (data) => housingTypeFilter.value === DEFAULT_VALUE
  ? true
  : data.offer.type === housingTypeFilter.value;

const filterByRooms = (data) => housingRoomsFilter.value === DEFAULT_VALUE
  ? true
  : data.offer.rooms === +housingRoomsFilter.value;

const filterByGuests = (data) => housingGuestsFilter.value === DEFAULT_VALUE
  ? true
  : data.offer.guests === +housingGuestsFilter.value;


const filterByPrice = (data) => {
  switch (housingPriceFilter.value) {
    case ApartmentPrices.MIDDLE :
      return data.offer.price > PriceLevels.LOW && data.offer.price <= PriceLevels.HIGH;

    case ApartmentPrices.LOW :
      return data.offer.price <= PriceLevels.LOW;

    case ApartmentPrices.HIGH :
      return data.offer.price > PriceLevels.HIGH;

    default : return true;
  }
};

const filterByFeatures = (data) => {
  const checkedFeatures = Array
    .from(housingFeaturesFilter.querySelectorAll('.map__checkbox:checked'))
    .map((element) => element.value);

  return (data.offer.features)
    ? checkedFeatures.every((feature) => data.offer.features.includes(feature))
    : checkedFeatures.length === 0;
};

export const filterData = (data) => data.filter((offer) => filterByType(offer)
  && filterByPrice(offer)
  && filterByRooms(offer)
  && filterByGuests(offer)
  && filterByFeatures(offer)
);

mapFilters.addEventListener('change', debounce(() => {
  clearMarkers();
  renderPins(getAds());
}, FILTER_DELAY));
