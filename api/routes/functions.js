const express= require ('express');
const router = express.Router();
const functionsController= require('../controllers/functionsController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get('/',functionsController.get);
router.get('/all-paging',functionsController.getallpaging);
router.get('/:id',functionsController.getbyID);
router.put('/:id',validate.validateFunctions(),functionsController.update);
router.delete('/:id',functionsController.delete);
router.delete('/delete/:id',functionsController.destroy);
router.post('/',validate.validateFunctions(),functionsController.create);  
router.get('/restore/:id',functionsController.restore);


module.exports= router;