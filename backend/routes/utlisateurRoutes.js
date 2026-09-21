const express = require("express");
const router = express.Router();
const utilisateurController = require("../controllers/utlisateurController");
const { verifyToken, authorizeRoles } = require("../middlewares/verifyToken");

router.get(
  "/get_all_users",
  verifyToken,
  authorizeRoles("admin"),
  utilisateurController.getUtilisateurs
);
router.get(
  "/get_user_by_id/:id",
  verifyToken,
  authorizeRoles("admin"),
  utilisateurController.getUtilisateur
);
router.delete(
  "/delete_user/:id",
  verifyToken,
  authorizeRoles("admin"),
  utilisateurController.deleteUtilisateur
);
router.put(
  "/update_user/:id",
  verifyToken,
  authorizeRoles("admin", "teacher", "student"),
  utilisateurController.updateUtilisateur
);

module.exports = router;
