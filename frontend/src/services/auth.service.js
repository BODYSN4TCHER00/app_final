import axios from "axios";

const URL_API = "http://localhost:3000/api/auth";
export function addUser(user) {
  return axios.post(`${URL_API}/register`, user);
}

export function login(data) {
  return axios.post(`${URL_API}/login`, data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}

export function logout() {
  return axios.post(`${URL_API}/logout`,undefined ,{ withCredentials: true });
  // return fetch(`${URL_API}/logout`, {method: 'POST',credentials: 'include'})
}
