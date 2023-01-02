const express = require("express");
const router = express.Router();
const studController = require("../app/controllers/studController");
const userController = require("../app/controllers/userController");
const adminController = require("../app/controllers/adminController");
const {
  authenticateUser,
  authorizeUser,
} = require("../app/middlewares/authentication");

// user

router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.login);
router.get("/api/user/account", authenticateUser, userController.account);

// admin

router.get("/api/admin/questions", authenticateUser, adminController.list);
router.get(
  "/api/questions/:id/feedback",
  authenticateUser,
  adminController.listFeedbackResponse
);
router.post(
  "/api/questions/:id/answertype",
  authenticateUser,
  adminController.createAnswer
);
router.put(
  "/api/questions/:id/rating",
  authenticateUser,
  adminController.updateRating
);

// student

router.get("/api/student/:id/questions", authenticateUser, studController.list);
router.get(
  "/api/student/:id/all/questions",
  authenticateUser,
  studController.listStuAllQuestions
);
router.get(
  "/api/student/:id/questions/rated",
  authenticateUser,
  studController.listStuRatedQuestions
);
router.post("/api/student/questions", authenticateUser, studController.create);
router.post(
  "/api/student/questions/:id",
  authenticateUser,
  studController.createRating
);
router.post(
  "/api/student/questions/:id/scaling",
  authenticateUser,
  studController.createScaling
);

module.exports = router;
