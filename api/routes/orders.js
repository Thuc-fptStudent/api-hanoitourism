const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const { validate } = require("../middlewares/validators");
router.get("/", ordersController.get);
router.get("/all-paging", ordersController.getallpaging);
router.get("/order-details", ordersController.getOderDetails);
router.get("/order-details-status", ordersController.getOderDetailsId);
router.get("/:id", ordersController.getbyID);
router.put("/:id", validate.validateOrder(), ordersController.update);
router.delete("/:id", ordersController.delete);
router.delete("/delete/:id", ordersController.destroy);
router.post("/", validate.validateOrder(), ordersController.create);
router.get("/restore/:id", ordersController.restore);

module.exports = router;
