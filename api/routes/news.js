const express= require ('express');
const router = express.Router();
const newsController= require('../controllers/newsController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get('/',newsController.get);
router.get('/all-paging',newsController.getallpaging);
router.get('/:id',newsController.getbyID);
router.put('/:id',newsController.update);
router.delete('/:id',newsController.delete);
router.delete('/delete/:id',newsController.destroy);
router.post('/',newsController.create);  
router.get('/restore/:id',newsController.restore);


module.exports= router;