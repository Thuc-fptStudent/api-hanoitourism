const express= require ('express');
const router = express.Router();
const productsController= require('../controllers/productsController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get('/',productsController.get);
router.get('/all-paging',productsController.getallpaging);
router.get('/category',productsController.getCate);
router.get('/:id',productsController.getbyID);
router.put('/:id',productsController.update);
router.delete('/:id',productsController.delete);
router.delete('/delete/:id',productsController.destroy);
router.post('/',productsController.create);  
router.get('/restore/:id',productsController.restore);

module.exports= router;