const salleService = require("../services/salleService");

// Create salle
const createSalle = async (req, res) => {
  try {
    const salle = await salleService.createSalle(req.body);
    res.status(201).json(salle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all salles
const getAllSalles = async (req, res) => {
  try {
    const salles = await salleService.getAllSalles();
    res.status(200).json(salles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get salle by ID
const getSalleById = async (req, res) => {
  try {
    const salle = await salleService.getSalleById(req.params.id);
    if (!salle) return res.status(404).json({ message: "Salle not found" });
    res.status(200).json(salle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update salle
const updateSalle = async (req, res) => {
  try {
    const salle = await salleService.updateSalle(req.params.id, req.body);
    if (!salle) return res.status(404).json({ message: "Salle not found" });
    res.status(200).json(salle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete salle
const deleteSalle = async (req, res) => {
  try {
    const salle = await salleService.deleteSalle(req.params.id);
    if (!salle) return res.status(404).json({ message: "Salle not found" });
    res.status(200).json({ message: "Salle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSalle,
  getAllSalles,
  getSalleById,
  updateSalle,
  deleteSalle,
};
