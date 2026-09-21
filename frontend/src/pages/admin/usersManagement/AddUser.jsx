import React, { useState } from "react";
import adminServices from "../../../services/adminServices";
const AddUser = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    mot_de_passe: "",
    cin: "",
    telephone: "",
    adresse: "",
    role: "student",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //bloquer l'action par default de formulaire 
    try {
      await adminServices.add_user(formData);
      setFormData({
        nom: "",
        email: "",
        mot_de_passe: "",
        cin: "",
        telephone: "",
        adresse: "",
        role: "student",
        status: "active",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Ajouter un utilisateur
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
            placeholder="Entrez le nom"
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
            placeholder="Entrez l'email"
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
            placeholder="Entrez le mot de passe"
            required
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
            placeholder="Entrez le CIN"
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
            placeholder="Numéro de téléphone"
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
            placeholder="Adresse complète"
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddUser;
