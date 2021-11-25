const express= require ('express');
const router = express.Router();
const customersController= require('../controllers/customersController');
const { validate } = require('../middlewares/validators');
const checkAuthMiddleware= require('../middlewares/jwt_token');

router.get('/',checkAuthMiddleware.checkAccessToken,customersController.get);
router.get('/all-paging',checkAuthMiddleware.checkAccessToken,customersController.getallpaging);
router.get('/address',checkAuthMiddleware.checkAccessToken,customersController.getListAddress);
router.get('/address/:id',checkAuthMiddleware.checkAccessToken,customersController.getAddress);
router.get('/bookings/:id', checkAuthMiddleware.checkAccessToken, customersController.getBookings);
router.get('/bookings', checkAuthMiddleware.checkAccessToken, customersController.getListBookings);
router.get('/:id',checkAuthMiddleware.checkAccessToken,customersController.getbyID);
router.put('/:id',checkAuthMiddleware.checkAccessToken,validate.validateRegisterUser(),customersController.update);
router.delete('/:id',checkAuthMiddleware.checkAccessToken,customersController.delete);
router.delete('/delete/:id',checkAuthMiddleware.checkAccessToken,customersController.destroy);
router.post('/register',validate.validateRegisterUser(),customersController.register);  
router.post('/login',validate.validateCheckLogin(),customersController.login);
router.get('/restore/:id',checkAuthMiddleware.checkAccessToken,customersController.restore);

module.exports= router;