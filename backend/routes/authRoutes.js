// les routes separeés
const express = require("express");
const authController = require("../controllers/authControllers");
const { verifyToken, authorizeRoles } = require("../middlewares/verifyToken");

let router = express.Router();

router.post(
  "/register",
  verifyToken,
  authorizeRoles("admin"),
  authController.register
);
router.post("/login", authController.login);


module.exports = router;
