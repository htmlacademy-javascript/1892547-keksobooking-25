import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;
export const successTemplate = document.querySelector('#success').content;
export const errorTemplate = document.querySelector('#error').content;
const alertTemplate = document.querySelector('#data-error').content;

export const onGetDataShowError = () => {
  const alertContainer = alertTemplate.cloneNode(true);
  const errorMessage = alertContainer.querySelector('.data-error');
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export const showMessage = (template) => {
  const fragment = template.cloneNode(true);
  const message = fragment.querySelector('div');
  document.body.append(message);

  function removeMessage (cb) {
    message.remove();
    document.removeEventListener('keydown', cb);
  }

  function onDocumentKeyDown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage(onDocumentKeyDown);
    }
  }

  document.addEventListener('keydown', onDocumentKeyDown);
  message.addEventListener('click', () => {
    removeMessage(onDocumentKeyDown);
  });
};

