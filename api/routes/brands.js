const express= require ('express');
const router = express.Router();
const brandsController= require('../controllers/brandsController');
const { validate } = require('../middlewares/validators');

router.get('/',brandsController.get);
router.get('/all-paging',brandsController.getallpaging);
router.get('/:id',brandsController.getbyID);
router.post('/',brandsController.create);
router.put('/:id',brandsController.update);
router.delete('/delete/:id',brandsController.destroy);
module.exports= router;