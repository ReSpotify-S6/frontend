import axios from "axios";

const api = axios.create({
  baseURL: 'http://api.respotify.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;