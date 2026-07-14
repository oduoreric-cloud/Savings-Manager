import axios from "axios";

const api = axios.create({
  baseURL: "https://desktop-tutorial-n2ba.onrender.com", // change if your backend is different
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;