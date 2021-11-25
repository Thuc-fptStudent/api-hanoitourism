const express = require("express");
const router = express.Router();
const newsCateController = require("../controllers/newsCategoryController");
const { validate } = require("../middlewares/validators");

router.get("/", newsCateController.getAll);
router.get("/all-paging", newsCateController.getallpaging);
router.post("/", validate.validateNewsCate(), newsCateController.create);
router.get("/:id", newsCateController.getById);
router.put("/:id", validate.validateNewsCate(), newsCateController.update);
router.delete("/delete/:id", newsCateController.destroy);
router.delete("/:id", newsCateController.delete);
router.get("/restore/:id", newsCateController.restore);

module.exports = router;