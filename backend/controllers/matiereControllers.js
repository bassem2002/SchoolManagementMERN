const matiereService = require("../services/matiereService");

const createMatiere = async (req, res) => {
  try {
    let createdMatiere = await matiereService.createMatiere(req.body);
    res
      .status(201)
      .json({ message: "matiere created successfully", createdMatiere });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMatiere = async (req, res) => {
  try {
    let updatedMatiere = await matiereService.updateMatiere(
      req.params.id,
      req.body
    );
    res
      .status(201)
      .json({ message: "matiere created successfully", updatedMatiere });
  } catch (Error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMatiere = async (req, res) => {
  try {
    let result = await matiereService.deleteMatiere(req.params.id);
    res.status(201).json({ message: "matiere deleted successfully", result });
  } catch (Error) {
    res.status(400).json({ error: error.message });
  }
};

const getMatiere = async (req, res) => {
  let result = await matiereService.getMatiere(req.params.id);
  res.json(result);
};

const getAllMatieres = async (req, res) => {
  let result = await matiereService.getAllMatieres();
  res.json(result);
};

const getTeacherSubjects = async (req, res) => {
  let result = await matiereService.getTeacherSubjects(req.params.id);
  res.json(result);
};

module.exports = {
  createMatiere,
  updateMatiere,
  deleteMatiere,
  getMatiere,
  getAllMatieres,
  getTeacherSubjects,
};
