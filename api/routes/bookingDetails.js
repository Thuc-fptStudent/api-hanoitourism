const express= require ('express');
const router = express.Router();
const bookingdetailsController= require('../controllers/bookingdetailsController');
const { validate } = require('../middlewares/validators');


router.get('/',bookingdetailsController.get);
router.get('/all-paging',bookingdetailsController.getallpaging);
router.get('/products',bookingdetailsController.getProducts);
router.get('/:id',bookingdetailsController.getbyID);
router.put('/:id',validate.validateBookingDetails(),bookingdetailsController.update);
router.delete('/:id',bookingdetailsController.delete);
router.delete('/delete/:id',bookingdetailsController.destroy);
router.post('/',validate.validateBookingDetails(),bookingdetailsController.create);  
router.get('/restore/:id',bookingdetailsController.restore);

module.exports= router;