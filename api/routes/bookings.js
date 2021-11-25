const express= require ('express');
const router = express.Router();
const bookingsController= require('../controllers/bookingsController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get('/',bookingsController.get);
router.post('/all-paging',bookingsController.getallpaging);
router.get('/details',bookingsController.getcombine);
router.get('/type',bookingsController.getType);
router.get('/:id',bookingsController.getbyID);
router.put('/:id',bookingsController.update);
router.delete('/:id',bookingsController.delete);
router.delete('/delete/:id',bookingsController.destroy);
router.post('/',bookingsController.create);  
router.get('/restore/:id',bookingsController.restore);

module.exports= router;