const express = require("express");
const router = express.Router();
const districtController = require("../controllers/districtController");

router.get("/", districtController.get);
router.get("/all-paging", districtController.getallpaging);
router.get("/get-news/:id", districtController.getNews);
router.get("/get-news", districtController.getListNews);
router.get("/ward", districtController.getListWard);
router.get("/ward/:id", districtController.getWard);
router.get("/hospital", districtController.getListHospital);
router.get("/hospital/:id", districtController.getHospital);
router.get("/pharmacy", districtController.getListPharmacy);
router.get("/pharmacy/:id", districtController.getPharmacy);
router.get("/bank", districtController.getListBank);
router.get("/bank/:id", districtController.getBank);
router.get("/atm", districtController.getListATM);
router.get("/atm/:id", districtController.getATM);
router.get("/embassy", districtController.getListEmbassy);
router.get("/embassy/:id", districtController.getEmbassy);
router.get("/agencies", districtController.getListAgencies);
router.get("/agencies/:id", districtController.getAgencies);
router.get("/:id", districtController.getbyID);
router.post("/", districtController.create);
router.put("/:id", districtController.update);
router.delete("/:id", districtController.delete);
router.get("/restore/:id", districtController.restore);

module.exports = router;
