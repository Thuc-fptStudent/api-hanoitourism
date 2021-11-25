const express= require ('express');
const router = express.Router();
const orderdetailsController= require('../controllers/orderdetailsController');
const { validate } = require('../middlewares/validators');


router.get('/',orderdetailsController.get);
router.get('/all-paging',orderdetailsController.getallpaging);
router.get('/paging/:OrderId',orderdetailsController.getPagingFilter);
router.put('/:id',validate.validateOrderDetail(),orderdetailsController.update);
router.delete('/:id',orderdetailsController.delete);
router.delete('/delete/:id',orderdetailsController.destroy);
router.post('/',validate.validateOrderDetail(),orderdetailsController.create);  
router.get('/restore/:id',orderdetailsController.restore);

module.exports= router;