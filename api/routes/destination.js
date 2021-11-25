const express = require("express");
const router = express.Router();
const desController = require("../controllers/destinationController");

router.get("/", desController.getAll);
router.post("/all-paging", desController.getallpaging);
router.get("/service/:id", desController.getService);
router.get("/service", desController.getListService);
router.get('/images/:id',desController.getImageId);
router.get('/hotels',desController.getStore);
router.get('/hotels/:id',desController.getStoreId);
router.get('/images',desController.getImage);
router.get("/:id",desController.getbyID);
router.post("/", desController.create);
router.put("/:id", desController.update);
router.delete("/:id", desController.delete);
router.get("/restore/:id", desController.restore);

module.exports = router;