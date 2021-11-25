const express= require ('express');
const router = express.Router();
const cityControler = require('../controllers/cityController');

router.get("/", cityControler.getAll);
router.get("/all-paging", cityControler.getallpaging);
router.get("/get-food", cityControler.getListFood);
router.get("/get-food/:id", cityControler.getFood);
router.get("/district", cityControler.getListDistrict);
router.get("/district/:id", cityControler.getDistrict);
router.get("/get-combines/:id", cityControler.getcombines)
router.get("/get-combines", cityControler.getListcombine);
router.get("/:id", cityControler.getbyID);
router.post("/", cityControler.create);
router.put("/:id", cityControler.update);
router.delete("/:id", cityControler.delete);
router.get("/restore/:id",cityControler.restore );

module.exports= router;