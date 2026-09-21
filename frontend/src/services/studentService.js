import axios from "axios";
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

const get_subjects_by_student_id = async (id) => {
  try {
    let result = await api.get(
      BASE_URL + `/lesson/get_subjects_by_student_id/${id}`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

const get_subject_documents = async (id) => {
  try {
    let result = await api.get(
      BASE_URL + `/documents/get_subject_documents/${id}`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

const get_student_lessons = async (id) => {
  try {
    let result = await api.get(BASE_URL + `/lesson/get_lessons_by_group/${id}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default {
  get_subjects_by_student_id,
  get_subject_documents,
  get_student_lessons,
};
