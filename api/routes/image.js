const express= require ('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get("/", imageController.getAll);
router.get("/all-paging", imageController.getallpaging);
router.get("/:id", imageController.getbyID);
router.post("/", imageController.create);
router.put("/:id", imageController.update);
router.delete("/:id", imageController.delete);
router.get("/restore/:id",imageController.restore );

module.exports= router;