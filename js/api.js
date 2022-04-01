import { showAlert } from './dialogs.js';

const UPLOAD_URL = 'https://25.javascript.pages.academy/keksobooking/';
const LOAD_URL = 'https://25.javascript.pages.academy/keksobooking/data';

export const getData = (onSuccess) => {
  fetch(LOAD_URL)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(showAlert);
};

export const sendData = (onSuccess, onError, body) => {
  fetch(UPLOAD_URL, {
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
