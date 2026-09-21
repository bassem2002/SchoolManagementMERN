import React, { useState } from "react";
//import axios from "axios";
import { FaBook, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices";

function CreateMatiere() {
  const [formData, setFormData] = useState({
    nomMatiere: "",
    coefficient: "",
    semestre: "1",
    description: "",
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
    try {
      await adminServices.create_matiere(formData);
      setFormData({
        nomMatiere: "",
        coefficient: "",
        semestre: "1",
        description: "",
      });
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la matière"+error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaBook className="text-blue-600" /> Ajouter une matière
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom de la matière */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nom de la matière
          </label>
          <input
            type="text"
            name="nomMatiere"
            value={formData.nomMatiere}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Ex: Mathématiques"
            required
          />
        </div>

        {/* Coefficient */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Coefficient
          </label>
          <input
            type="number"
            name="coefficient"
            value={formData.coefficient}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Ex: 3"
            required
          />
        </div>

        {/* Semestre */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Semestre
          </label>
          <select
            name="semestre"
            value={formData.semestre}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="1">Semestre 1</option>
            <option value="2">Semestre 2</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Brève description du cours"
            rows={3}
          ></textarea>
        </div>

        {/* Bouton d’envoi */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus /> Ajouter la matière
        </button>
      </form>
    </div>
  );
}

export default CreateMatiere;
