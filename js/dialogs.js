import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;
const alertTemplate = document.querySelector('#data-error').content;

export const showAlert = () => {
  const alertContainer = alertTemplate.cloneNode(true);
  const errorMessage = alertContainer.querySelector('.data-error');
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, ALERT_SHOW_TIME);
};

const removeMessage = (message, onAction) => {
  message.remove();
  document.removeEventListener('keydown', onAction);
};

export const showMessage = (template, messageClass) => {
  const fragment = template.cloneNode(true);
  const message = fragment.querySelector(messageClass);
  document.body.append(message);

  const onDocumentKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage(message, onDocumentKeyDown);
    }
  };

  document.addEventListener('keydown', onDocumentKeyDown);

  message.addEventListener('click', () => {
    removeMessage(message, onDocumentKeyDown);
  });
};

