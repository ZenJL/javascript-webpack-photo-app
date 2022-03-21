// css
import '../css/photoAdd.css';

import { addPhoto } from './apis';

// Token
const token = window.sessionStorage.getItem('token');

if (token === null) {
  window.location.href = '/login.html';
}

// Get elements
const addForm = document.getElementById('addForm');
const categoryInput = document.getElementById('category');
const photoUrlInput = document.getElementById('photoUrl');
const photoNameInput = document.getElementById('photoName');
const descriptionInput = document.getElementById('description');

// ErrorMsg
const categoryErrorMsg = document.getElementById('categoryErrorMsg');
const photoNameErrorMsg = document.getElementById('photoNameErrorMsg');
const photoUrlErrorMsg = document.getElementById('photoUrlErrorMsg');
const descriptionErrorMsg = document.getElementById('descriptionErrorMsg');

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

// Add photo
addForm.addEventListener('submit', async (e) => {
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
      descriptionErrorMsg.style.display = 'block';
      descriptionErrorMsg.innerHTML = 'Description image can not be empty';
    }

    return;
  }

  const photoData = { image, title, description, category };

  try {
    const res = await addPhoto(token, photoData);
    console.log('update ne: ', res);

    setLoading.style.display = 'none';

    displayToast(res.data.msg);

    setTimeout(() => {
      window.location.href = '/index.html';
    }, 2000);
  } catch (error) {
    setLoading.style.display = 'none';

    console.log(error);
  }
});
