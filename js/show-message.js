import { isEscapeKey } from './util.js';

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
