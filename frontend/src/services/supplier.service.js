import axios from "axios";

const URL_API = "http://localhost:3000/api/suppliers";

export function getSupplierInfo() {
  return axios.get(`${URL_API}`, { withCredentials: true });
}

export function newSupplier(data) {
  return axios.post(`${URL_API}`, data, { withCredentials: true });
}

export function updateSupplier(data) {
  return axios.put(`${URL_API}/${data.supplierId}`, data, {
    withCredentials: true,
  });
}

export function deleteSupplier(data) {
  return axios.delete(`${URL_API}/${data.supplierId}`, {
    withCredentials: true,
  });
}
