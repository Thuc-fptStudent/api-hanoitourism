const express = require("express");
const router = express.Router();
const wardController = require("../controllers/wardController");

router.get("/", wardController.getAll);
router.get("/all-paging", wardController.getallpaging);
router.get("/:id", wardController.getbyID);
router.post("/", wardController.create);
router.put("/:id", wardController.update);
router.delete("/:id", wardController.delete);
router.get("/restore/:id", wardController.restore);

module.exports = router;