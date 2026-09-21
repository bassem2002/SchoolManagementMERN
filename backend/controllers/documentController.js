const documentService = require("../services/documentService");

// Créer un documents
const createDocuments = async (req, res) => {
  try {
    const fichier = req.file ? req.file.filename : null; // Récupérer le fichier

    const documentsData = {
      // Créer un objet avec les données du formulaire et le fichier
      ...req.body,
      fichier: fichier,
    };

    const documents = await documentService.createDocument(documentsData);
    res.status(201).json({ message: "documents créé avec succès", documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les documents
const getAllDocuments = async (req, res) => {
  try {
    const documents = await documentService
      .getAllDocument()
     
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentsById = async (req, res) => {
  try {
    const documents = await documentService.getDocumentById(req.params.id);
    if (!documents)
      return res.status(404).json({ message: "documents non trouvé" });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubjectDocuments = async (req, res) => {
  try {
    const documents = await documentService.getSubjectDocuments(req.params.id);
    if (!documents)
      return res.status(404).json({ message: "documents non trouvé" });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDocuments = async (req, res) => {
  try {
    // Récupérer le nom du fichier s’il y en a un
    const fichier = req.file ? req.file.filename : null;

    // Construire les données à mettre à jour
    const updateData = {
      ...req.body,
    };

    // Si un fichier a été uploadé, on l’ajoute à l’objet
    if (fichier) {
      updateData.fichier = fichier;
    }

    const documents = await documentService.updateDocument(
      req.params.id,
      updateData
    );

    if (!documents) {
      return res.status(404).json({ message: "document non trouvé" });
    }

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDocuments = async (req, res) => {
  try {
    const documents = await documentService.deleteDocument(req.params.id);
    if (!documents)
      return res.status(404).json({ message: "documents non trouvé" });
    res.status(200).json({ message: "documents supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTeacherDocuments = async (req, res) => {
  try {
    const documents = await documentService.getTeacherDocuments(req.params.id);
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDocuments,
  getAllDocuments,
  getDocumentsById,
  updateDocuments,
  deleteDocuments,
  getTeacherDocuments,
  getSubjectDocuments,
};
