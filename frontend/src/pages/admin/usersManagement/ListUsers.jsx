import React, { useEffect, useState } from "react";
import adminServices from "../../../services/adminServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ListUsers = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const { user } = useSelector((state) => state.auth);
  // rod belek !!! utilisateurs = [dsdsd,sdsdsd,sd]
  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  // creaetion d'une fonction de navigation
  const navigate = useNavigate();

  const fetchUtilisateurs = async () => {
    try {
      const res = await adminServices.get_users();
      setUtilisateurs(res.data);
      // rod belek utilisateurs = res.data !!!!! ghaaalet
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const supprimerUtilisateur = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await adminServices.delete_user(id);
        fetchUtilisateurs();
        toast.error("utilisateur supprimé ! ");
      } catch (error) {
        console.error("Erreur suppression :", error);
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await adminServices.toggle_user_status(id, newStatus);
      fetchUtilisateurs();
      toast.info("status modifié ! ");
    } catch (error) {
      console.error("Erreur changement statut :", error);
    }
  };
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-end flex-end mb-5 ">
        <button
          onClick={() => navigate("/add_user")}
          className="w-[10vw] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ajouter utlisateur
        </button>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">
        Liste des utilisateurs
      </h2>
      <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Nom</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Rôle</th>
            <th className="py-2 px-4 text-left">Statut</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((el) => (
            <tr key={el._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{el.nom}</td>
              <td className="py-2 px-4">{el.email}</td>
              <td className="py-2 px-4 capitalize">{el.role}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    el.status === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {el.status}
                </span>
              </td>
              <td className="py-2 px-4 text-center space-x-2">
                <button
                  onClick={() => toggleStatus(el._id, el.status)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  disabled={el.role == "admin"}
                >
                  {el.status === "active" ? "Désactiver" : "Activer"}
                </button>

                <button
                  onClick={() => navigate(`/update_user/${el._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Modifier
                </button>

                <button
                  onClick={() => supprimerUtilisateur(el._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded 
             disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                  disabled={user._id === el._id}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}

          {utilisateurs.length === 0 && (
            <tr>
              <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
