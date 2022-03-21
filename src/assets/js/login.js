// css
import '../css/login.css';

import { loginUser } from './apis';

// Get elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email_address');
const passwordInput = document.getElementById('password');
const errorMsgContainer = document.getElementById('error-msg-container');
const errorMsg = document.getElementById('error-msg');
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

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  setLoading.style.display = 'flex';

  // Get input value
  const email = emailInput.value;
  const password = passwordInput.value;

  // Validation form
  if (email === '' || password === '') {
    setTimeout(() => {
      setLoading.style.display = 'none';
      errorMsgContainer.style.display = 'flex';
      errorMsg.innerHTML = 'Email and password can not be empty.';
      emailInput.focus();
    }, 500);
    return;
  }

  const validateEmail = (email) => {
    const correctMailFormat =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.match(correctMailFormat)) return true;
  };

  const checkCorrectFormat = validateEmail(email);

  if (!checkCorrectFormat) {
    setTimeout(() => {
      setLoading.style.display = 'none';
      errorMsgContainer.style.display = 'flex';
      errorMsg.innerHTML = 'Please enter a valid email address.';
      emailInput.focus();
    }, 700);
    return;
  }

  try {
    const res = await loginUser(email, password);

    setLoading.style.display = 'none';
    console.log('res: ', res);

    window.sessionStorage.setItem('token', res.data.token);

    displayToast(res.data.msg);
    setTimeout(() => {
      window.location.href = '/index.html?page=1';
    }, 2000);
    return;
  } catch (error) {
    // console.log(error.response.data.msg);
    setLoading.style.display = 'none';
    emailInput.focus();
    errorMsgContainer.style.display = 'flex';
    errorMsg.innerHTML = `${error.response.data.msg}`;
    return;
  }
});
