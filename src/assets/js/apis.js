import axios from 'axios';

const API = 'https://tony-auth-express.herokuapp.com';

export const registerUser = async (
  avatar,
  firstName,
  lastName,
  email,
  password
) => {
  const bodyData = {
    avatar,
    firstName,
    lastName,
    email,
    password,
    role: 'operator',
  };

  return axios({
    method: 'POST',
    url: API + '/api/user/register',
    data: bodyData,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loginUser = async (email, password) => {
  const bodyData = {
    email,
    password,
  };

  return axios({
    method: 'POST',
    url: API + '/api/user/login',
    data: bodyData,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getUser = async (token) => {
  return axios({
    method: 'POST',
    url: API + '/api/auth',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  });
};

export const getAllPhotos = async (token, page = 1, limit = 10) => {
  return axios({
    method: 'GET',
    url: API + `/api/photo?page=${page}&limit=${limit}?`,
    headers: {
      'x-auth-token': token,
    },
  });
};

export const getPhoto = async (token, photoId) => {
  return axios({
    method: 'GET',
    url: API + `/api/photo/${photoId}`,
    headers: {
      'x-auth-token': token,
    },
  });
};

export const addPhoto = async (token, photoData) => {
  return axios({
    method: 'POST',
    url: API + `/api/photo`,
    data: photoData,
    headers: {
      'x-auth-token': token,
    },
  });
};

export const updatePhoto = async (token, photoId, newPhotoData) => {
  return axios({
    method: 'PUT',
    url: API + `/api/photo/${photoId}`,
    data: newPhotoData,
    headers: {
      'x-auth-token': token,
    },
  });
};
