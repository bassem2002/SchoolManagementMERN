const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const upload = require("../middlewares/uploads"); // pour faire la requete de upload de fichier
const { verifyToken, authorizeRoles } = require("../middlewares/verifyToken");

// Routes
router.post(
  "/add_document",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  upload.single("fichier"),
  documentController.createDocuments
); // zedna upload ta fichier
router.get("/get_all_document", documentController.getAllDocuments);
router.get(
  "/get_document_by_id/:id",
  verifyToken,
  authorizeRoles("teacher"),
  documentController.getDocumentsById
);
router.put(
  "/update_document/:id",
  upload.single("fichier"), // middleware == fi wost bine path url address and controler
  verifyToken,
  authorizeRoles("teacher"),
  documentController.updateDocuments
);
router.delete(
  "/delete_document/:id",
  verifyToken,
  authorizeRoles("teacher"),
  documentController.deleteDocuments
);
router.get(
  "/get_teacher_documents/:id",
  verifyToken,
  authorizeRoles("teacher", "admin"),
  documentController.getTeacherDocuments
);

router.get(
  "/get_subject_documents/:id",
  verifyToken,
  authorizeRoles("student", "teacher", "admin"),
  documentController.getSubjectDocuments
);

module.exports = router;
