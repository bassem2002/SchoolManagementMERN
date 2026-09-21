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

const add_user = async (data) => {
  let result = await api.post(BASE_URL + "/auth/register", data);
  toast.success("Utilisateur ajouté avec succès !");
  return result;
};

const get_users = async () => {
  let result = await api.get(BASE_URL + "/users/get_all_users");
  return result;
};

const delete_user = async (id) => {
  let result = await api.delete(BASE_URL + "/users/delete_user/" + id);
  toast.warning("Utilisateur supprimé avec succès !");
  return result;
};

const toggle_user_status = async (id, newStatus) => {
  let result = api.put(BASE_URL + `/users/update_user/${id}`, {
    status: newStatus,
  });

  return result;
};

const update_user = async (id, data) => {
  let result = api.put(BASE_URL + `/users/update_user/${id}`, data);

  return result;
};

const get_user_by_id = async (id) => {
  let result = api.get(BASE_URL + `/users/get_user_by_id/${id}`);

  return result;
};

const create_group = async (data) => {
  let result = api.post(BASE_URL + `/group/create_group`, data);

  return result;
};

const get_all_groups = async () => {
  let result = api.get(BASE_URL + `/group/get_all_groups`);

  return result;
};

const update_group = async (id, data) => {
  let result = api.put(BASE_URL + `/group/update_group/${id}`, data);

  return result;
};

const get_group_by_id = async (id) => {
  let result = api.get(BASE_URL + `/group/get_group_by_id/${id}`);

  return result;
};

const delete_group = async (id) => {
  let result = api.delete(BASE_URL + `/group/delete_group/${id}`);
  toast.error("groupe supprimé avec succès");
  return result;
};
const create_matiere = async (data) => {
  let result = api.post(BASE_URL + `/matiere/ajouter_matiere`, data);
  toast.success("matiere ajouté avec succes ! ");
  return result;
};
const get_all_matieres = async () => {
  let result = api.get(BASE_URL + `/matiere/get_all_matieres`);

  return result;
};
const delete_matiere = async (id) => {
  let result = api.delete(BASE_URL + `/matiere/delete_matiere/${id}`);
  toast.error("matiere supprimé avec succès");
  return result;
};
const get_matiere_by_id = async (id) => {
  let result = api.get(BASE_URL + `/matiere/get_matiere_by_id/${id}`);

  return result;
};
const update_matiere = async (id, data) => {
  let result = api.put(BASE_URL + `/matiere/update_matiere/${id}`, data);
  toast.info("matiere mis a jour avec succes ! ");
  return result;
};
const create_lesson = async (data) => {
  let result = api.post(BASE_URL + `/lesson/add_lesson`, data);
  // toast.success("Leçon ajoutée avec succès !");
  return result;
};
const get_all_salles = async () => {
  let result = api.get(BASE_URL + `/salle/get_all_salles`);

  return result;
};
const get_all_lessons = async () => {
  let result = api.get(BASE_URL + `/lesson/get_all_lesson`);
  return result;
};
const delete_lesson = async (id) => {
  let result = api.delete(BASE_URL + `/lesson/delete_lesson/${id}`);
  toast.error("lesson supprimé avec succès");
  return result;
};
const update_lesson = async (id, data) => {
  let result = api.put(BASE_URL + `/lesson/modifier_lesson/${id}`, data);
  toast.success("Leçon mise à jour avec succès !");
  return result;
};
const get_lesson_by_id = async (id) => {
  let result = api.get(BASE_URL + `/lesson/get_lesson_by_id/${id}`);

  return result;
};

const get_all_documents = async () => {
  let result = api.get(BASE_URL + `/documents/get_all_document`);

  return result;
};

const addSalle = async (data) => {
  let result = api.post(BASE_URL + `/salle/add_salle`, data);
  // toast.success("Leçon ajoutée avec succès !");
  return result;
};
const get_salle_by_id = async (id) => {
  let result = api.get(BASE_URL + `/salle/${id}`);

  return result;
};

const updateSalle = async (id, data) => {
  let result = api.put(BASE_URL + `/salle/${id}`, data);

  return result;
};

const delete_salle = async (id) => {
  let result = api.delete(BASE_URL + `/salle/${id}`);

  return result;
};

export default {
  delete_salle,
  updateSalle,
  get_salle_by_id,
  get_all_salles,
  addSalle,
  add_user,
  get_users,
  delete_user,
  toggle_user_status,
  update_user,
  get_user_by_id,
  create_group,
  get_all_groups,
  update_group,
  get_group_by_id,
  delete_group,
  create_matiere,
  get_all_matieres,
  delete_matiere,
  get_matiere_by_id,
  update_matiere,
  create_lesson,
  get_all_lessons,
  delete_lesson,
  update_lesson,
  get_lesson_by_id,
  get_all_documents,
};
