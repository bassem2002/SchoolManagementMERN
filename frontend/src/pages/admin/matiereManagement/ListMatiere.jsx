//rfce
import React, { useEffect, useState } from "react";
import adminServices from "../../../services/adminServices";
import { FaTrashAlt, FaEdit, FaBook, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListMatiere = () => {
  const [matieres, setMatieres] = useState([]);
  const navigate = useNavigate();

  const fetchMatieres = async () => {
    try {
      const result = await adminServices.get_all_matieres();
      setMatieres(result.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des matières" + error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette matière ?")) {
      try {
        await adminServices.delete_matiere(id);
        setMatieres((prev) => prev.filter((m) => m._id !== id));
      } catch (error) {
        toast.error("Erreur lors de la suppression de la matière" + error);
      }
    }
  };

  useEffect(() => {
    fetchMatieres();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 overflow-x-auto">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
        <FaBook className="text-blue-600 text-4xl" />
        Liste des matières
      </h2>
      <button
        onClick={() => navigate("/create_matiere")}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <FaPlus /> Ajouter une matiere
      </button>
      {matieres.length === 0 ? (
        <p className="text-gray-600">Aucune matière trouvée.</p>
      ) : (
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-700 text-base border-b">
            <tr>
              <th className="px-6 py-4">Nom</th>
              <th className="px-6 py-4">Coefficient</th>
              <th className="px-6 py-4">Semestre</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {matieres.map((matiere) => (
              <tr key={matiere._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {matiere.nomMatiere}
                </td>
                <td className="px-6 py-4">{matiere.coefficient}</td>
                <td className="px-6 py-4">{matiere.semestre}</td>
                <td className="px-6 py-4 italic text-gray-500">
                  {matiere.description || "—"}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/Update_matiere/${matiere._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(matiere._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ListMatiere;
