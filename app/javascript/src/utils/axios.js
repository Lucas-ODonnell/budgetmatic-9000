import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

export const customFetch = axios.create({
  baseURL: "/api/v1/",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers.common["Authorization"] = `${user.authorization}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//For non-api routes

export const altFetch = axios.create({
  baseURL: "/",
});

altFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers.common["Authorization"] = `${user.authorization}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
