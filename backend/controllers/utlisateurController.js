const utilisateurService = require("../services/userServices");

// GET /api/utilisateurs
const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await utilisateurService.getAllUtilisateurs();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/utilisateurs/:id
const getUtilisateur = async (req, res) => {
  try {
    const utilisateur = await utilisateurService.getUtilisateurById(
      req.params.id
    );
    if (!utilisateur)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/utilisateurs/:id
const deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await utilisateurService.deleteUtilisateur(
      req.params.id
    );
    if (!utilisateur)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/utilisateurs/:id
const updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await utilisateurService.updateUtilisateur(
      req.params.id,
      req.body
    );
    if (!utilisateur)
      return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getUtilisateurs,
  getUtilisateur,
  deleteUtilisateur,
  updateUtilisateur,
};
