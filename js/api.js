const UPLOAD_URL = 'https://25.javascript.pages.academy/keksobooking/';
const LOAD_URL = 'https://25.javascript.pages.academy/keksobooking/data';

export const getData = (onSuccess, onError) => {
  fetch(LOAD_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onError();
    })
    .then((data) => onSuccess(data))
    .catch(onError);
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
