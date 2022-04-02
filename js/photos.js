import { form } from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageFileChooser = form.querySelector('.ad-form__upload input[type=file]');
const imagePreview = form.querySelector('.ad-form__photo img');
const avatarFileChooser = form.querySelector('.ad-form__field input[type=file]');
const avatarPreview = form.querySelector('.ad-form-header__preview img');

const setImagePreview = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

setImagePreview(imageFileChooser, imagePreview);
setImagePreview(avatarFileChooser, avatarPreview);
