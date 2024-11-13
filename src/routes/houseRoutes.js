const express = require("express");
const router = express.Router();
const houseController = require("../controllers/houseController");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/create", authMiddleware.isAuthenticated, authMiddleware.isOwner, houseController.createHouse);

module.exports = router;
