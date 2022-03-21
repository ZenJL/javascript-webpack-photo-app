// css
import '../css/photoDetail.css';

import { getPhoto } from './apis';

// Token
const token = window.sessionStorage.getItem('token');

if (token === null) {
  window.location.href = '/login.html';
}

// PhotoId
const photoId = window.sessionStorage.getItem('photoId');

// Get Element
const cardWrapper = document.getElementById('cardWrapper');

const setLoading = document.getElementById('loadingSpinnerContainer');

setLoading.style.display = 'flex';

// Fetch photo to display
async function getPhotoData() {
  try {
    const res = await getPhoto(token, photoId);
    console.log('res: ', res);
    const photoData = res.data.data;
    console.log('photoData: ', photoData);

    cardWrapper.innerHTML = `
      <div class="card" id="${photoData._id}">
        <div class="wrapImgPhoto">
          <img src="${photoData.image}" class="card-img-top" alt="photoImg" />
        </div>

        <div class="card-content">
          <div class="card-body">
            <h5 class="card-title">${photoData.title}</h5>
            <p class="card-text">${photoData.description}</p>
          </div>
          <div class="card-footer">
            <div class="timeImg">Last updated ${new Date(
              photoData.date
            ).getMinutes()} minutes</div>
          </div>
        </div>
      </div>
    `;
    setLoading.style.display = 'none';
  } catch (error) {
    setLoading.style.display = 'none';

    console.log(error.response);
    return;
  }
}

getPhotoData();
