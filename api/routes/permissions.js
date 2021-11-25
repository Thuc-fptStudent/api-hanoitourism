const express= require ('express');
const router = express.Router();
const permissionsController= require('../controllers/permissionsController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');


router.get('/',permissionsController.get);
router.get('/all-paging',permissionsController.getallpaging);
router.get('/all-paging/:RoleId',permissionsController.getallpagingRoleId);
router.get('/:id',permissionsController.getbyID);
router.get('/get-by-roleid/:RoleId',permissionsController.getbyRoleID);
router.put('/:id',validate.validatePermission(),permissionsController.update);
router.delete('/:id',permissionsController.delete);
router.delete('/delete/:id',permissionsController.destroy);
router.post('/',validate.validatePermission(),permissionsController.create);  
router.get('/restore/:id',permissionsController.restore);


module.exports= router;