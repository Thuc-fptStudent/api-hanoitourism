const express= require ('express');
const router = express.Router();
const assessController= require('../controllers/assessController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get('/',assessController.getAll);
router.post('/all-paging',assessController.getallpaging);
router.get('/:id',assessController.getbyID);
router.put('/:id',assessController.update);
router.delete('/:id',assessController.delete);
router.post('/create-url',assessController.createUrl);
router.post('/',assessController.create);  
router.get('/restore/:id',assessController.restore);

module.exports= router;