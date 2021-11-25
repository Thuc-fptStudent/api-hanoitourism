const express= require ('express');
const router = express.Router();
const modulesController= require('../controllers/modulesController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get('/all-paging',modulesController.getallpaging);
router.get('/',modulesController.get);
router.get('/functions',modulesController.filter);
router.get('/:id',modulesController.getbyID);
router.put('/:id',validate.validateModules(),modulesController.update);
router.delete('/:id',modulesController.delete);
router.delete('/delete/:id',modulesController.destroy);
router.post('/',validate.validateModules(),modulesController.create);  
router.get('/restore/:id',modulesController.restore);


module.exports= router;