const express= require ('express');
const router = express.Router();
const providersController= require('../controllers/providersController');
const { validate } = require('../middlewares/validators');
// const {signAccessToken}= require('../helper/jwt');

router.get('/',providersController.get);
router.get('/all-paging',providersController.getallpaging);
router.get('/:id',providersController.getbyID);
router.put('/:id',validate.validateCreateProviders(),providersController.update);
router.delete('/:id',providersController.delete);
router.delete('/delete/:id',providersController.destroy);
router.post('/',validate.validateCreateProviders(),providersController.create);  
router.get('/restore/:id',providersController.restore);

module.exports= router;