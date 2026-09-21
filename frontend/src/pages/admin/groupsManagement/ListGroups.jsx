import React, { useEffect, useState } from "react";
import adminServices from "../../../services/adminServices";
import {
  FaTrashAlt,
  FaEdit,
  FaUsers,
  FaPlus,
  FaUserGraduate,
  FaLayerGroup,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const result = await adminServices.get_all_groups();
      console.log(result);
      setGroups(result.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce groupe ?")) {
      try {
        await adminServices.delete_group(id);
        setGroups((prev) => prev.filter((g) => g._id !== id));
      } catch (error) {
        console.error("Erreur suppression :", error);
      }
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaUsers className="text-indigo-600 text-4xl" />
          <span>Liste des Groupes</span>
        </h2>
        <button
          onClick={() => navigate("/create_group")}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all shadow-md"
        >
          <FaPlus /> Ajouter un groupe
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaUsers className="text-gray-400 text-4xl" />
          </div>
          <p className="text-gray-600 text-lg">Aucun groupe trouvé.</p>
          <button
            onClick={() => navigate("/create_group")}
            className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Créer votre premier groupe
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <div
              key={group._id}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaLayerGroup className="text-indigo-500" />
                    {group.nom}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <FaUserGraduate className="mr-1" /> Niveau: {group.niveau}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FaUsers className="mr-1" /> {group.eleves.length} élève
                      {group.eleves.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors"
                    onClick={() => navigate(`/update_group/${group._id}`)}
                    title="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors"
                    onClick={() => handleDelete(group._id)}
                    title="Supprimer"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-3">
                  <FaUserGraduate className="text-indigo-500" />
                  Élèves du groupe:
                </h4>
                {group.eleves.length === 0 ? (
                  <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <FaUserGraduate className="text-gray-400" />
                    <span>Aucun élève assigné à ce groupe</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.eleves.map((eleve) => (
                      <div
                        key={eleve._id}
                        className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <FaUserGraduate size={14} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {eleve.nom}
                          </p>
                          <p className="text-xs text-gray-500">{eleve.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListGroups;
