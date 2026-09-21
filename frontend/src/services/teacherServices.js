//http://localhost:3000/api/documents/add_document POST

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

const add_document = async (data) => {
  try {
    let result = await api.post(BASE_URL + "/documents/add_document", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("document ajouté avec succès");
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

const get_matieres = async () => {
  try {
    let result = await api.get(BASE_URL + "/matiere/get_all_matieres");
    return result;
  } catch (error) {
    console.error(error);
  }
};

const get_teacher_documents = async (id) => {
  try {
    let result = await api.get(
      BASE_URL + `/documents/get_teacher_documents/${id}`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

const update_document = async (id, data) => {
  try {
    const result = await api.put(
      BASE_URL + `/documents/update_document/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du document :", error);
    throw error; // pour que le composant puisse gérer l'erreur aussi
  }
};

const get_document_by_id = async (id) => {
  let result = api.get(BASE_URL + `/documents/get_document_by_id/${id}`);

  return result;
};

const delete_document = async (id) => {
  let result = api.delete(BASE_URL + `/documents/delete_document/${id}`);
  toast.error("document supprimé avec succès");
  return result;
};

const get_lessons_by_teacher_id = async (id) => {
 try {
   let result = await api.get(BASE_URL + `/lesson/get_lessons_by_teacher_id/${id}`);
   return result;
 } catch (error) {
   console.error(error);
 }
}


const get_teacher_subjects = async (id) => {
  try {
    let result = await api.get(BASE_URL + `/matiere/get_teacher_subjects/${id}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};


export default {
  add_document,
  get_matieres,
  get_teacher_documents,
  update_document,
  get_document_by_id,
  delete_document,
  get_lessons_by_teacher_id,
  get_teacher_subjects,
};
