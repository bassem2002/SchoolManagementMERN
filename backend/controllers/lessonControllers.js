const lessonService = require("../services/lessonServices");
const matiereServices = require("../services/matiereService");

const createLesson = async (req, res) => {
  try {
    let createdLesson = await lessonService.createLesson(req.body);
    res
      .status(201)
      .json({ message: "Lesson created successfully", createdLesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLessons = async (req, res) => {
  try {
    let result = await lessonService.getLessons(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLessons = async (req, res) => {
  try {
    let result = await lessonService.getAllLessons();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubjectsByStudentId = async (req, res) => {
  try {
    let result = await matiereServices.getStudentSubjects(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLesson = async (req, res) => {
  try {
    let updatedLesson = await lessonService.updateLesson(
      req.params.id,
      req.body
    );
    res
      .status(201)
      .json({ message: "matiere updated successfully", updatedLesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    let result = await lessonService.deleteLesson(req.params.id);
    res.status(201).json({ message: "matiere deleted successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLessonsByTeacherId = async (req, res) => {
  try {
    let result = await lessonService.getLessonsByTeacherId(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLessonsByGroup = async (req, res) => {
  try {
    let result = await lessonService.lessonsByGroup(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLesson,
  getLessons,
  updateLesson,
  deleteLesson,
  getAllLessons,
  getLessonsByTeacherId,
  getLessonsByGroup,
  getSubjectsByStudentId,
};
