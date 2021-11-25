const express = require("express");
const router = express.Router();
const serController = require("../controllers/serviceController");

router.get("/", serController.getAll);
router.post("/all-paging", serController.getallpaging);
router.get("/:id",serController.getbyID);
router.post("/", serController.create);
router.put("/:id",serController.update);
router.delete("/:id", serController.delete);
router.get("/restore/:id", serController.restore);

module.exports = router;