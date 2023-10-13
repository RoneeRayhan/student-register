const express = require("express");
const router = express.Router();
const WorksController = require("../controllers/WorksController");
const authMiddleware = require("../controllers/AuthController");

router.post("/", authMiddleware.verifyToken, WorksController.createWork);
router.get("/", authMiddleware.verifyToken, WorksController.getAllWorks);
router.put("/:id", authMiddleware.verifyToken, WorksController.updateWork);
router.delete("/:id", authMiddleware.verifyToken, WorksController.deleteWork);

module.exports = router;
