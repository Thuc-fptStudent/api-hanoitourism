const express= require ('express');
const router = express.Router();
const addressController= require('../controllers/addressController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get('/',addressController.getAll);
router.post('/all-paging',addressController.getallpaging);
router.get('/:id',addressController.getbyID);
router.put('/:id',addressController.update);
router.delete('/:id',addressController.delete);
router.post('/',addressController.create);  
router.get('/restore/:id',addressController.restore);

module.exports= router;