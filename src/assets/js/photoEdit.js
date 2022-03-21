import '../css/photoAdd.css';

import { getPhoto, updatePhoto } from './apis';

// Token
const token = window.sessionStorage.getItem('token');

if (token === null) {
  window.location.href = '/login.html';
}

// PhotoId
const photoId = window.sessionStorage.getItem('photoId');

// Get Elements
const editForm = document.getElementById('editForm');
const categoryInput = document.getElementById('category');
const photoNameInput = document.getElementById('photoName');
const photoUrlInput = document.getElementById('photoUrl');
const descriptionInput = document.getElementById('description');

// ErrorMsg
const descriptionErrMsg = document.getElementById('descriptionErrorMsg');
const photoUrlErrorMsg = document.getElementById('photoUrlErrorMsg');
const photoNameErrorMsg = document.getElementById('photoNameErrorMsg');
const categoryErrorMsg = document.getElementById('categoryErrorMsg');

//
const toastMsg = document.getElementById('toastMsg');
const setLoading = document.getElementById('loadingSpinnerContainer');

// Set toast
function displayToast(message) {
  toastMsg.className = 'show';
  toastMsg.innerHTML = message;
  setTimeout(() => {
    toastMsg.className = toastMsg.className.replace('show', '');
  }, 2000);
}

// Fetch photo to display
async function getPhotoData() {
  setLoading.style.display = 'flex';

  try {
    const res = await getPhoto(token, photoId);
    const photoData = res.data.data;
    console.log('photoData: ', photoData);

    const categoryArrOptions = categoryInput.options;

    for (const option of categoryArrOptions) {
      if (option.value === photoData.category) {
        categoryInput.value = photoData.category;
      }
    }
    photoNameInput.value = photoData.title;
    photoUrlInput.value = photoData.image;
    descriptionInput.value = photoData.description;
    setLoading.style.display = 'none';
  } catch (error) {
    setLoading.style.display = 'none';

    console.log(error.response);
    return;
  }
}

getPhotoData();

// Update photo
editForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  setLoading.style.display = 'flex';

  // console.log(photoUrlInput.value);
  const image = photoUrlInput.value;
  const title = photoNameInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;

  // Validate form input
  if (image === '' || title === '' || description === '' || category === '') {
    setLoading.style.display = 'none';

    if (title === '') {
      photoNameErrorMsg.style.display = 'block';
      photoNameErrorMsg.innerHTML = 'Title image can not be empty';
    }
    if (category === '') {
      categoryErrorMsg.style.display = 'block';
      categoryErrorMsg.innerHTML = 'Please choose a category for this photo';
    }
    if (image === '') {
      photoUrlErrorMsg.style.display = 'block';
      photoUrlErrorMsg.innerHTML = 'Url image can not be empty';
    }
    if (description === '') {
      descriptionErrMsg.style.display = 'block';
      descriptionErrMsg.innerHTML = 'Description image can not be empty';
    }

    return;
  }

  const newPhotoData = { image, title, description, category };

  try {
    const res = await updatePhoto(token, photoId, newPhotoData);
    console.log('update ne: ', res);

    setLoading.style.display = 'none';

    displayToast(res.data.msg);
    sessionStorage.removeItem('photoId');
    setTimeout(() => {
      window.location.href = '/index.html';
    }, 2300);
  } catch (error) {
    setLoading.style.display = 'none';

    console.log(error);
  }
});
