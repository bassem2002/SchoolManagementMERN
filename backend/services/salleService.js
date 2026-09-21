const Salle = require("../models/salle");

// Create a new salle
const createSalle = async (data) => {
  const salle = new Salle(data);
  return await salle.save();
};

// Get all salles
const getAllSalles = async () => {
  return await Salle.find();
};

// Get salle by ID
const getSalleById = async (id) => {
  return await Salle.findById(id);
};

// Update salle
const updateSalle = async (id, data) => {
  return await Salle.findByIdAndUpdate(id, data, { new: true });
};

// Delete salle
const deleteSalle = async (id) => {
  return await Salle.findByIdAndDelete(id);
};

module.exports = {
  createSalle,
  getAllSalles,
  getSalleById,
  updateSalle,
  deleteSalle,
};
