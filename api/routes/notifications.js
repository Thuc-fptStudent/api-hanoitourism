const express= require ('express');
const router = express.Router();
const notificationsController= require('../controllers/notificationsController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');   

router.get('/',notificationsController.get);
router.get('/all-paging',notificationsController.getallpaging);
router.get('/:id',notificationsController.getbyID);
router.put('/:id',validate.validateNoticfication(),notificationsController.update);
router.delete('/:id',notificationsController.delete);
router.delete('/delete/:id',notificationsController.destroy);
router.post('/',validate.validateNoticfication(),notificationsController.create);  
router.get('/restore/:id',notificationsController.restore);

module.exports= router;