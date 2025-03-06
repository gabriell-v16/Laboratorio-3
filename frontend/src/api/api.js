import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Asegúrate de que coincida con la URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar el token al header en cada petición
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Cambia esto con el nombre que tenga tu token
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;