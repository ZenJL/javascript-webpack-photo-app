import axios from 'axios';

// css
import '../css/main.css';

import { getUser, getAllPhotos, deletePhoto } from './apis';

// Token
const token = window.sessionStorage.getItem('token');

// cards
const cardContainer = document.getElementById('card-container');
const userWrapper = document.getElementById('userWrapper');

// Elements
const toTopBtn = document.getElementById('backToTopBtn');
const logoutBtn = document.getElementById('logoutBtn');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const setLoading = document.getElementById('loadingSpinnerContainer');

// setloading
setLoading.style.display = 'flex';

// Pagination
const pagination = document.getElementById('pagination');

const previousBtn = document.getElementById('page-previous');
const nextBtn = document.getElementById('page-next');

// Log out
logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  window.location.href = '/login.html';
});

// Back to Top feature
toTopBtn.addEventListener('click', (e) => {
  // document.body.scrollTop = 0;
  // document.documentElement.scrollTop = 0;

  window.scrollTo(0, 0);
});

// Go to add page
addPhotoBtn.addEventListener('click', (e) => {
  window.location.href = '/photo-add.html';
});

// Check authenticate 1st
async function checkAuth() {
  setLoading.style.display = 'flex';

  try {
    const res = await getUser(token);
    console.log('user: ', res);
    const userData = res.data.user.user;
    console.log('user: ', userData);

    userWrapper.innerHTML = `
      <div class="userImgWrap">
        <img
          src="${userData.avatar}"
          class="userAvatar"
          alt="userAvatar"
        />
      </div>
      <div class="userContent">
        <p>Hello,</p>
        <p class="userName">${userData.firstName}</p>
      </div>
    `;
  } catch (error) {
    console.log(error.response);
    window.location.href = '/login.html';
  }
}

checkAuth();

async function fetchPhotos(page = 1, limit = 10) {
  // console.log('hien tai dang page: ', page);

  const url = window.location.search;
  // console.log('day ne: ', url);
  const params = new URLSearchParams(url);
  const pageParam = params.get('page') || page; // string
  const limitParam = params.get('limit') || limit;

  try {
    const res = await getAllPhotos(token, pageParam, limitParam);
    // console.log('res photos: ', res);

    // console.log('res photos: ', res.data.data); // getlist

    const photos = res.data.data;

    // pagination
    const totalPaginationNumber = Math.ceil(res.data.total / res.data.limit);

    const htmls = photos.map((photo) => {
      return `
        <div class="card" id="${photo._id}">
          <div class="wrapImgPhoto">
            <img
              src="${photo.image}"
              class="card-img-top"
              alt="photoImg"
            />
          </div>
          <div class="card-content">
            <div class="card-body">
              <h5 class="card-title">${photo.title}</h5>
              <p class="card-text">${photo.description}</p>
            </div>
            <div class="card-footer">
              <div class="groupBtn">
                <a href="/photo-detail.html" class="btn btn-primary"
                  onclick="sessionStorage.setItem('photoId', '${photo._id}')
                ">
                  View</a>
                <a href="/photo-edit.html" class="btn btn-primary"
                  onclick="sessionStorage.setItem('photoId', '${photo._id}')
                ">
                  Edit</a>
              </div>
              <div class="timeImg">${new Date(
                photo.date
              ).getMinutes()} mins ago</div>
            </div>
          </div>
        </div>
      `;
    });
    cardContainer.innerHTML = htmls.join('');

    renderPagination(totalPaginationNumber);

    let currentPage = parseInt(pageParam);
    // console.log('currne: ', currentPage);
    // console.log('currne: ', typeof currentPage);
    if (currentPage === 1) {
      previousBtn.classList.add('disabled');
    } else {
      previousBtn.classList.remove('disabled');
      previousBtn.addEventListener('click', () => {
        currentPage--;
        window.location.replace(`/index.html?page=${currentPage}`);
      });
    }

    if (currentPage === totalPaginationNumber) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
      nextBtn.addEventListener('click', () => {
        currentPage++;
        window.location.replace(`/index.html?page=${currentPage}`);
      });
    }
    setLoading.style.display = 'none';
  } catch (error) {
    console.log(error);
    return;
  }
}

fetchPhotos();

function renderPagination(totalPaginationNumber) {
  // html pagination
  const arrayPaginationNumber = Array.from(Array(totalPaginationNumber).keys());
  console.log('array page: ', arrayPaginationNumber); // works

  const htmlPagination = arrayPaginationNumber.map((item) => {
    return `
      <li class="page-item">
        <a class="page-link page-render" href="#">${item + 1}</a>
      </li>
    `;
  });

  pagination.innerHTML = htmlPagination.join('');

  const liPageItem = document.querySelectorAll('.page-render');

  liPageItem.forEach((li, index) => {
    li.addEventListener('click', () => {
      const actualCurrentPage = index + 1;

      // console.log('window location: ', window.location.href);

      window.location.replace(`/index.html?page=${actualCurrentPage}`);
    });
  });
}
