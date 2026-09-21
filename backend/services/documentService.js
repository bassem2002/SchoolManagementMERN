const Document = require("../models/document");

// Créer
const createDocument = async (data) => {
  const newDocument = new Document(data);
  return await newDocument.save();
};

const getAllDocument = async () => {
  return await Document.find().populate("matiere_id").populate("professeur_id");
};

const getDocumentById = async (id) => {
  return await Document.findById(id).populate("matiere_id");
};

// Mettre à jour un Document
const updateDocument = async (id, data) => {
  return await Document.findByIdAndUpdate(id, data);
};

// Supprimer un Document
const deleteDocument = async (id) => {
  return await Document.findByIdAndDelete(id);
};

const getTeacherDocuments = async (id) => {
  return await Document.find({ professeur_id: id })
    .populate("professeur_id")
    .populate("matiere_id");
};

const getStudentDocuments = async (id) => {
  return await Document.find().populate("matiere_id").populate("professeur_id");
};

const getSubjectDocuments = async (id) => {
  return await Document.find({ matiere_id: id });
};

module.exports = {
  createDocument,
  getAllDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getTeacherDocuments,
  getStudentDocuments,
  getSubjectDocuments,
};
