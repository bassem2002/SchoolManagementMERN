import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices";
import teacherServices from "../../../services/teacherServices";
import { FaEdit } from "react-icons/fa";

const UpdateDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtenir le document (probablement un tableau, donc on prend le premier)
        const docRes = await teacherServices.get_document_by_id(id); // id de l'enseignant
        const documents = docRes.data;
        const doc = Array.isArray(documents) ? documents[0] : documents;

        if (!doc) {
          toast.error("Document non trouvé");
          return;
        }

        setFormData({
          titre: doc.titre,
          contenu: doc.contenu,
          type: doc.type,
          matiere_id: doc.matiere_id?._id || doc.matiere_id || "",
          professeur_id: doc.professeur_id?._id || doc.professeur_id || "",
        });

        const [matRes, userRes] = await Promise.all([
          teacherServices.get_matieres(),
          adminServices.get_users(),
        ]);

        setAllMatieres(matRes.data);
        setAllProfs(userRes.data.filter((u) => u.role === "teacher"));
      } catch (err) {
        toast.error("Erreur lors du chargement du document. " + err.message);
      }
    };

    fetchData();
  }, [id]);

  /*
useEffect(()=>{
  
    bloc d'instructions 
  
  },[tableau de dependances ])


*/

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("titre", formData.titre);
      data.append("contenu", formData.contenu);
      data.append("type", formData.type);
      data.append("professeur_id", formData.professeur_id);
      data.append("matiere_id", formData.matiere_id);

      if (fichier) data.append("fichier", fichier);

      await teacherServices.update_document(id, data);
      toast.success("Document mis à jour !");
      // permet d'exuster une fonction ba3d wa9t 
      setTimeout(() => {
        navigate("/documents_list");
      }, 2000);
    } catch (err) {
      toast.error("Erreur lors de la mise à jour. " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <FaEdit className="text-blue-600" /> Modifier le document
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

        <div>
          <label className="block text-gray-700 mb-1">Matière</label>
          <select
            name="matiere_id"
            value={formData.matiere_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">-- Choisir une matière --</option>
            {allMatieres.map((matiere) => (
              <option key={matiere._id} value={matiere._id}>
                {matiere.nomMatiere}
              </option>
            ))}
          </select>
        </div>

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

        <div>
          <label className="block text-gray-700 mb-1">Nouveau fichier ?</label>
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
          <FaEdit /> Mettre à jour le document
        </button>
      </form>
    </div>
  );
};

export default UpdateDocument;
