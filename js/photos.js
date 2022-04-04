const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

const form = document.querySelector('.ad-form');
const imageFileChooser = form.querySelector('.ad-form__upload input[type=file]');
const imagesPreviewContainer = form.querySelector('.ad-form__photo-container');
const photoContainer = imagesPreviewContainer.querySelector('.ad-form__photo');
const avatarFileChooser = form.querySelector('.ad-form__field input[type=file]');
const avatarPreview = form.querySelector('.ad-form-header__preview img');


avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const isMatch = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isMatch) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

imageFileChooser.addEventListener('change', () => {
  const file = imageFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const isMatch = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isMatch) {
    const newImage = document.createElement('img');
    newImage.src = URL.createObjectURL(file);
    newImage.width = '40';
    newImage.height = '44';

    if (photoContainer.querySelector('img')) {
      const newPreviewContainer = document.createElement('div');
      newPreviewContainer.classList.add('ad-form__photo');
      imagesPreviewContainer.append(newPreviewContainer);
      newPreviewContainer.append(newImage);
    } else {
      photoContainer.append(newImage);
    }
  }
});

export const clearImages = () => {
  const photos = document.querySelectorAll('.ad-form__photo');
  avatarPreview.src = DEFAULT_AVATAR_SRC;
  const image = form.querySelector('.ad-form__photo img');
  if (image) {
    photos.forEach((photo, index) => index === 0 ? photo.firstChild.remove() : photo.remove());
  }
};
