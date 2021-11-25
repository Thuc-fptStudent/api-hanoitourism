const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const { validate } = require("../middlewares/validators");
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get("/", categoriesController.getAll);
router.get("/cuisine", categoriesController.getAllCuisine);
router.get("/products/:id", categoriesController.getProducts);
router.get("/products", categoriesController.getListProducts);
router.get("/bank", categoriesController.getListBank);
router.get("/bank/:id", categoriesController.getBank);
router.get("/:id", categoriesController.getbyID);
router.put(
  "/:id",
  categoriesController.update
);
router.delete("/:id", categoriesController.delete);
router.delete("/delete/:id", categoriesController.destroy);
router.post(
  "/",
  categoriesController.create
);
router.get("/restore/:id", categoriesController.restore);


module.exports = router;
