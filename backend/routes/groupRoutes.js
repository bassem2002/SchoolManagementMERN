const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const { verifyToken, authorizeRoles } = require("../middlewares/verifyToken");

router.post(
  "/create_group",
  verifyToken,
  authorizeRoles("admin"),
  groupController.createGroup
);
router.get(
  "/get_all_groups",
  verifyToken,
  authorizeRoles("admin"),
  groupController.getAllGroups
);
router.get(
  "/get_group_by_id/:id",
  verifyToken,
  authorizeRoles("admin"),
  groupController.getGroupById
);
router.put(
  "/update_group/:id",
  verifyToken,
  authorizeRoles("admin"),
  groupController.updateGroup
);
router.delete(
  "/delete_group/:id",
  verifyToken,
  authorizeRoles("admin"),
  groupController.deleteGroup
);

module.exports = router;
