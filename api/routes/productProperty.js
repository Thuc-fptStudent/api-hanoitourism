const express= require ('express');
const router = express.Router();
const productPropertyController= require('../controllers/productPropertyController');
const { validate } = require('../middlewares/validators');

router.get('/',productPropertyController.get);
router.get('/all-paging',productPropertyController.getallpaging);
router.get('/:id',productPropertyController.getbyID);
router.post('/',validate.validateProductProPerty(),productPropertyController.create);
router.put('/:id',validate.validateProductProPerty(),productPropertyController.update);
router.delete('/delete/:id',productPropertyController.destroy);
module.exports= router;