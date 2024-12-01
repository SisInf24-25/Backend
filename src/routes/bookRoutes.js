const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/create", authMiddleware.isAuthenticated, authMiddleware.isGuest, bookController.createBook);

module.exports = router;
