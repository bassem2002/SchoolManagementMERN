const express = require("express");
const lessonControllers = require("../controllers/lessonControllers");
const { verifyToken, authorizeRoles } = require("../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/add_lesson",
  verifyToken,
  authorizeRoles("admin"),
  lessonControllers.createLesson
);
router.put("/modifier_lesson/:id",
    verifyToken,
  authorizeRoles("admin"),
   lessonControllers.updateLesson);
router.get("/get_lesson_by_id/:id",
    verifyToken,
  authorizeRoles("admin"),
   lessonControllers.getLessons);
router.get("/get_all_lesson",
  verifyToken,
  authorizeRoles("admin"), lessonControllers.getAllLessons);
router.delete("/delete_lesson/:id",
    verifyToken,
  authorizeRoles("admin"),
   lessonControllers.deleteLesson);
router.get(
  "/get_lessons_by_teacher_id/:id",
  verifyToken,
  authorizeRoles("teacher"),
  lessonControllers.getLessonsByTeacherId
);
router.get("/get_lessons_by_group/:id", lessonControllers.getLessonsByGroup);
router.get(
  "/get_subjects_by_student_id/:id",
  verifyToken,
  authorizeRoles("student"),
  lessonControllers.getSubjectsByStudentId
);



module.exports = router;
