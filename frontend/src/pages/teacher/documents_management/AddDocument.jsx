import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices"; // adapte le chemin si besoin
import { FaFileUpload } from "react-icons/fa";
import teacherServices from "../../../services/teacherServices";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const AddDocument = () => {
  const [formData, setFormData] = useState({
    titre: "",
    contenu: "",
    matiere_id: "",
    type: "cours",
    professeur_id: "",
  });

  const [fichier, setFichier] = useState(null);
  const [allMatieres, setAllMatieres] = useState([]);
  const [allProfs, setAllProfs] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const id = location.state;
  console.log(id);
  useEffect(() => {
    // Charger les matières et les professeurs
    const fetchData = async () => {
      try {
        const matieresRes = await teacherServices.get_matieres();
        setAllMatieres(matieresRes.data);
        // matieresRes.data.data
        if (user.role == "admin") {
          const usersRes = await adminServices.get_users();
          setAllProfs(usersRes.data.filter((u) => u.role === "teacher"));
        } else if (user.role == "teacher") {
          setFormData({ ...formData, professeur_id: user._id });
        }
      } catch (err) {
        toast.error("Erreur lors du chargement des données." + err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
  };

  const handleMatiereSelect = (e) => {
    setFormData((prev) => ({ ...prev, matiere_id: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // creation d'un formulaire pour upload de fichier
      const data = new FormData();
      data.append("titre", formData.titre); //
      data.append("contenu", formData.contenu);
      data.append("type", formData.type);
      data.append("professeur_id", user._id);
      if (user.role == "teacher") {
        data.append("matiere_id", id);
      } else if (user.role == "admin") {
        data.append("matiere_id", formData.matiere_id);
      }

      if (fichier != null) data.append("fichier", fichier);

      await teacherServices.add_document(data);

      setFormData({
        titre: "",
        contenu: "",
        matiere_id: [],
        type: "cours",
        professeur_id: "",
      });
      setFichier(null);
    } catch (err) {
      toast.error("Erreur lors de l'ajout du document." + err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <FaFileUpload className="text-blue-600" /> Ajouter un document
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-1">Titre</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Contenu</label>
          <textarea
            name="contenu"
            value={formData.contenu}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="cours">Cours</option>
            <option value="TP">TP</option>
            <option value="TD">TD</option>
            <option value="Exam">Examen</option>
          </select>
        </div>

        {user.role == "admin" && (
          <div>
            <label className="block text-gray-700 mb-1">Matière(s)</label>
            <select
              name="matiere_id"
              value={formData.matiere_id}
              onChange={handleMatiereSelect}
            >
              {allMatieres.map((matiere) => (
                <option key={matiere._id} value={matiere._id}>
                  {matiere.nomMatiere}
                </option>
              ))}
            </select>
          </div>
        )}

        {user.role == "admin" ? (
          <div>
            <label className="block text-gray-700 mb-1">Professeur</label>
            <select
              name="professeur_id"
              value={formData.professeur_id}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="">-- Choisir un professeur --</option>
              {allProfs.map((prof) => (
                <option key={prof._id} value={prof._id}>
                  {prof.nom} ({prof.email})
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div>
          <label className="block text-gray-700 mb-1">
            Fichier (PDF, etc.)
          </label>
          <input
            type="file"
            name="fichier"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <FaFileUpload /> Ajouter le document
        </button>
      </form>
    </div>
  );
};

export default AddDocument;
