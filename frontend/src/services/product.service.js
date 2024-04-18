import axios from "axios";

const URL_API = "http://localhost:3000/api/products";

export function newProduct(data) {
  return axios.post(`${URL_API}`, data, { withCredentials: true });
}

export function getProducts() {
  return axios.get(`${URL_API}`, {withCredentials: true})
}

export function updateProduct(data) {
  return axios.put(`${URL_API}/${data.productCode}`, data, {withCredentials: true})
}

export function deleteProduct(data) {
  return axios.delete(`${URL_API}/${data.productCode}`, {withCredentials: true})
}