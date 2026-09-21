const express = require("express");
const matiereControllers = require("../controllers/matiereControllers");
const { verifyToken, authorizeRoles } = require("../middlewares/verifyToken");

const router = express.Router();

router.post(
  "/ajouter_matiere",
  verifyToken,
  authorizeRoles("admin"),
  matiereControllers.createMatiere
);

router.put(
  "/update_matiere/:id",
  verifyToken,
  authorizeRoles("admin"),
  matiereControllers.updateMatiere
);

// localhost:3000/api/matiere/update_matiere/5454545454545

router.delete(
  "/delete_matiere/:id",
  verifyToken,
  authorizeRoles("admin"),
  matiereControllers.deleteMatiere
);

router.get(
  "/get_matiere_by_id/:id",
  verifyToken,
  authorizeRoles("admin"),
  matiereControllers.getMatiere
);

router.get(
  "/get_all_matieres",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  matiereControllers.getAllMatieres
);

router.get(
  "/get_teacher_subjects/:id",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  matiereControllers.getTeacherSubjects
);

module.exports = router;
