import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminServices from "../../../services/adminServices";
import { toast } from "react-toastify";
import { FaBook, FaEdit } from "react-icons/fa";

const UpdateMatiere = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomMatiere: "",
    coefficient: "",
    semestre: "1",
    description: "",
  });

  useEffect(() => {
    const fetchMatiere = async () => {
      try {
        const res = await adminServices.get_matiere_by_id(id);
        setFormData(res.data);
      } catch (error) {
        toast.error("Erreur lors du chargement de la matière" + error);
      }
    };

    fetchMatiere();
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
      await adminServices.update_matiere(id, formData);

      navigate("/list_matiere");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de la matière" + error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaBook className="text-blue-600" /> Modifier la matière
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            required
          />
        </div>

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
            required
          />
        </div>

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

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            rows={3}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition"
        >
          <FaEdit /> Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateMatiere;
