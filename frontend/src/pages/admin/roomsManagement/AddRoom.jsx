import React, { useState } from "react";
import { FaBuilding, FaPlus, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import adminServices from "../../../services/adminServices";

const AddRoom = () => {
  const [nom, setNom] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom.trim()) {
      toast.error("Veuillez entrer un nom de salle");
      return;
    }

    setIsSubmitting(true);

    try {
      await adminServices.addSalle({ nom: nom });
      toast.success("Salle ajoutée avec succès !");
      setNom(""); // Reset form after successful submission
    } catch (error) {
      console.error("Erreur lors de l'ajout de la salle:", error);
      toast.error(
        error.response?.data?.message || "Erreur lors de l'ajout de la salle"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <FaBuilding className="text-2xl text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Ajouter une salle</h2>
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

        <div className="flex justify-end">
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

export default AddRoom;
