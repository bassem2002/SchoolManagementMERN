const bcrypt = require("bcryptjs");
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
const updateUtilisateur = async (id, data, actor) => {
  const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
  if (!actor || (actor.role !== "admin" && String(actor._id) !== String(id))) {
    fail(403, "Modification non autorisee");
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) fail(400, "Donnees invalides");
  const fields = ["nom", "email", "cin", "telephone", "adresse"];
  if (actor.role === "admin") fields.push("role", "status");
  else if (Object.hasOwn(data, "role") || Object.hasOwn(data, "status")) {
    fail(403, "Modification des champs sensibles interdite");
  }
  const updates = {};
  for (const field of fields) {
    if (Object.hasOwn(data, field)) updates[field] = data[field];
  }
  if (Object.hasOwn(data, "mot_de_passe") && data.mot_de_passe !== "") {
    if (typeof data.mot_de_passe !== "string") fail(400, "Mot de passe invalide");
    updates.mot_de_passe = await bcrypt.hash(data.mot_de_passe, 10);
  }
  return await Utilisateur.findByIdAndUpdate(id, { $set: updates }, {
    new: true, runValidators: true,
  });
};

module.exports = {
  getAllUtilisateurs,
  getUtilisateurById,
  deleteUtilisateur,
  updateUtilisateur,
};
