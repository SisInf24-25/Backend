const express = require("express");
const router = express.Router();
const houseController = require("../controllers/houseController");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/create", authMiddleware.isAuthenticated, authMiddleware.isOwner, houseController.createHouse);
router.post("/delete", authMiddleware.isAuthenticated, authMiddleware.isOwner, houseController.deleteHouse);
router.post("/modify", authMiddleware.isAuthenticated, authMiddleware.isOwner, houseController.modifyHouse);

module.exports = router;
