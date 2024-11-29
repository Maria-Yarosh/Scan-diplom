import axios from "axios";

export const api = axios.create({
  baseURL: "https://gateway.scan-interfax.ru",
});
//interceptors перехватчик запросов(выполняется до запроса, сетает в headers токен)
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
