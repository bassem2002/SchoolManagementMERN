import React, { useState, useEffect } from "react";
import adminServices from "../../../services/adminServices";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams(); // récupère l'ID de l'utilisateur à partir de l'URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    mot_de_passe: "", // facultatif à l'update
    cin: "",
    telephone: "",
    adresse: "",
    role: "student",
    status: "active",
  });

  const fetchUser = async () => {
    try {
      const user = await adminServices.get_user_by_id(id);
      console.log(user);
      setFormData({ ...user.data, mot_de_passe: "" }); // vider mot de passe pour sécurité
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };
      if (!formData.mot_de_passe) delete updatedData.mot_de_passe;

      await adminServices.update_user(id, updatedData);
      toast.success("Utilisateur mis à jour avec succès.");
      navigate("/list_users"); // redirige vers la liste
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Modifier l'utilisateur
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Nom complet</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            name="mot_de_passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
            placeholder="Laisser vide pour ne pas changer"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">CIN</label>
          <input
            type="number"
            name="cin"
            value={formData.cin}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Téléphone</label>
          <input
            type="number"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Adresse</label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Rôle</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
          >
            <option value="admin">Administrateur</option>
            <option value="teacher">Enseignant</option>
            <option value="student">Étudiant</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Statut</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-1"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
