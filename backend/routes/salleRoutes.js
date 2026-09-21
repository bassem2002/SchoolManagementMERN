const express = require("express");
const router = express.Router();
const salleController = require("../controllers/salleControllers");
const { verifyToken, authorizeRoles } = require("../middlewares/verifyToken");

router.post("/add_salle", salleController.createSalle);
router.get(
  "/get_all_salles",
  verifyToken,
  authorizeRoles("admin"),
  salleController.getAllSalles
);
router.get("/:id", salleController.getSalleById);
router.put("/:id", salleController.updateSalle);
router.delete("/:id", salleController.deleteSalle);

module.exports = router;
