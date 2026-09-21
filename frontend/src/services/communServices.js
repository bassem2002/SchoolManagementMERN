import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../../redux/store";

const BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// credentials == token m redux mta3na (store)

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const updateUser = async (id, data) => {
  let result = api.put(BASE_URL + `/users/update_user/${id}`, data);
  toast.info("profile mis a jour avec succes ! ");
  return result;
};

export default {
  updateUser,
};
