const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/registerUser", userController.registerUser);

router.post("/login", userController.login);
router.post("/logout", authMiddleware.isAuthenticated, userController.logout);
/*router.get("/profile", authMiddleware.isAuthenticated, userController.profile);
router.get("/:other_id", authMiddleware.boolAuthenticated, userController.anyUserProfile);*/

module.exports = router;
