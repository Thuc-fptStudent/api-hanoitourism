const express= require ('express');
const router = express.Router();
const { validate } = require('../middlewares/validators');
const productFeatureController= require('../controllers/productFeatureController');

router.get('/',productFeatureController.get);
router.get('/all-paging',productFeatureController.getallpaging);
router.get('/:id',productFeatureController.getbyID);
router.post('/',validate.validateProductFeature(),productFeatureController.create);
router.put('/:id',validate.validateProductFeature(),productFeatureController.update);
router.delete('/delete/:id',productFeatureController.destroy);

module.exports= router;