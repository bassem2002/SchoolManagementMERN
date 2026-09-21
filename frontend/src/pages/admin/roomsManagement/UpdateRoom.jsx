import React, { useState, useEffect } from "react";
import { FaBuilding, FaSave, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import adminServices from "../../../services/adminServices";

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSalle = async () => {
      setLoading(true);
      try {
        const response = await adminServices.get_salle_by_id(id);
        setNom(response.data.nom);
      } catch (error) {
        toast.error("Erreur lors du chargement de la salle");
        console.error(error);
        navigate("/list_rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchSalle();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom.trim()) {
      toast.error("Veuillez entrer un nom de salle valide");
      return;
    }

    setIsSubmitting(true);

    try {
      await adminServices.updateSalle(id, { nom });
      toast.success("Salle mise à jour avec succès !");
      navigate("/list_rooms");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error(
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/list_rooms")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft /> Retour
        </button>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <FaBuilding className="text-blue-600" />
          Modifier la salle
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom de la salle
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Ex: Salle 101"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/salles")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium transition ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enregistrement...
              </>
            ) : (
              <>
                <FaSave />
                Enregistrer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRoom;
