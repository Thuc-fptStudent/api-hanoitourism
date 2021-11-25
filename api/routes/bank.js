const express= require ('express');
const router = express.Router();
const bankController= require('../controllers/bankController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get('/',bankController.getAll);
router.post('/all-paging',bankController.getallpaging);
router.get('/:id',bankController.getbyID);
router.put('/:id',bankController.update);
router.delete('/:id',bankController.delete);
router.post('/',bankController.create);  
router.get('/restore/:id',bankController.restore);

module.exports= router;