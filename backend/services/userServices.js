const Utilisateur = require("../models/Utilisateur");

// Obtenir tous les utilisateurs
const getAllUtilisateurs = async () => {
  return await Utilisateur.find();
};

// Obtenir un utilisateur par ID
const getUtilisateurById = async (id) => {
  return await Utilisateur.findById(id);
};

// Supprimer un utilisateur
const deleteUtilisateur = async (id) => {
  return await Utilisateur.findByIdAndDelete(id);
};

// Mettre à jour un utilisateur
const updateUtilisateur = async (id, data) => {
  return await Utilisateur.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  getAllUtilisateurs,
  getUtilisateurById,
  deleteUtilisateur,
  updateUtilisateur,
};
