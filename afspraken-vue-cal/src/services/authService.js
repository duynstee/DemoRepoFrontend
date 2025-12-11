import axios from 'axios';

const API_URL = 'https://localhost:44381/api/Auth';

export function login(username, password) {
  return axios.post(`${API_URL}/login`, { username, password })
    .then(res => {
      if (res.data.token) {
        localStorage.setItem('userToken', res.data.token);
      }
      return res.data;
    });
}

export function logout() {
  localStorage.removeItem('userToken');
}

export function getToken() {
  return localStorage.getItem('userToken');
}

export function isLoggedIn() {
  return !!getToken();
}