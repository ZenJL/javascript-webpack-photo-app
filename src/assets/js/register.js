// css
import '../css/register.css';

// action
import { registerUser } from './apis';

// Elements
const randomBtn = document.getElementById('btnRandomImg');
const avatar = document.getElementById('randomAvatar');

// -- form
const form = document.getElementById('registerForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email_address');
const passwordInput = document.getElementById('password');
const errorMsgField = document.getElementById('msg-error');
const toastMsg = document.getElementById('toastMsg');
const setLoading = document.getElementById('loadingSpinnerContainer');

//// Success toast
function displayToast(message) {
  toastMsg.className = 'show';
  toastMsg.innerHTML = message;
  setTimeout(() => {
    toastMsg.className = toastMsg.className.replace('show', '');
  }, 2000);
}

// Get random avatar
randomBtn.addEventListener('click', () => {
  let randomNumber = Math.floor(Math.random() * 101);
  avatar.src = `https://joeschmoe.io/api/v1/random${randomNumber}`;
});

//// Form action
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // setLoading
  setLoading.style.display = 'flex';

  // Input value
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const avatarUrl = avatar.src;

  // Validation form
  if (firstName === '' || lastName === '' || email === '' || password === '') {
    setTimeout(() => {
      setLoading.style.display = 'none';
      errorMsgField.style.display = 'flex';
      errorMsgField.innerHTML =
        'Please make sure you entered all the fields above.';
      firstNameInput.focus();
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

      errorMsgField.style.display = 'flex';
      errorMsgField.innerHTML = 'Please enter the correct email format.';
      emailInput.focus();
    }, 500);
    return;
  }

  try {
    const res = await registerUser(
      avatarUrl,
      firstName,
      lastName,
      email,
      password
    );
    console.log('res', res);
    displayToast(res.data.msg);
    setLoading.style.display = 'none';

    setTimeout(() => {
      window.location.href = '/login.html';
    }, 2500);
    return;
  } catch (error) {
    const errorResponse = error.response.data;
    // console.log(error.response.data);
    setLoading.style.display = 'none';

    errorMsgField.style.display = 'flex';
    errorMsgField.innerHTML = errorResponse.msg;
    emailInput.focus();

    emailInput.addEventListener('blur', (e) => {
      if (e.target.value !== '') {
        errorMsgField.style.display = 'none';
      }
    });

    return;
  }
});
