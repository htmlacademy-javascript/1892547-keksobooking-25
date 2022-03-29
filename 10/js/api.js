import { showAlert } from './util.js';

const ADRESS = 'https://25.javascript.pages.academy/keksobooking/';

export const getData = (onSuccess) => {
  fetch(`${ADRESS}data`)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      showAlert('Ошибка загрузки данных с сервера');
    });
};

export const sendData = (onSuccess, onError, body) => {
  fetch(ADRESS, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(onError);
};
