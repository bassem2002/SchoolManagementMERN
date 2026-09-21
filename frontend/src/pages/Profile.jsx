import React, { useState } from "react";

import { toast } from "react-toastify";
import UpdateUser from "./admin/usersManagement/UpdateUser";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaIdCard,
  FaPhone,
  FaSave,
} from "react-icons/fa";
export default function ProfilUtilisateur({ user }) {
  const [madeChange, setMadeChange] = useState(false);
  const [formData, setFormData] = useState({
    nom: user.nom || "",
    email: user.email || "",
    mot_de_passe: "",
    adresse: user.adresse || "",
    cin: user.cin || "",
    telephone: user.telephone || "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMadeChange(true);
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await UpdateUser(user._id, formData);
      toast.success("Informations mises à jour avec succès !");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100 p-6">
      <div className="w-full bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Mettre à jour vos informations
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-gray-700 mb-1 flex items-center">
              <FaUser className="mr-2 text-blue-500" /> Nom
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre nom"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" /> Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre email"
                required
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-gray-700 mb-1 flex items-center">
              <FaLock className="mr-2 text-blue-500" /> Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="mot_de_passe"
                value={formData.mot_de_passe}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nouveau mot de passe"
              />
            </div>
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-gray-700 mb-1 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" /> Adresse
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre adresse"
              />
            </div>
          </div>

          {/* CIN */}
          <div>
            <label className="block text-gray-700 mb-1 flex items-center">
              <FaIdCard className="mr-2 text-blue-500" /> CIN
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIdCard className="text-gray-400" />
              </div>
              <input
                type="number"
                name="cin"
                value={formData.cin}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre CIN"
              />
            </div>
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-gray-700 mb-1 flex items-center">
              <FaPhone className="mr-2 text-blue-500" /> Téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre numéro de téléphone"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !madeChange}
            className={`relative w-full py-2 px-4 rounded-lg text-white transition flex items-center justify-center ${
              loading || !madeChange
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Mise à jour...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Enregistrer les modifications
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
