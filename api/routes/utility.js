const express= require ('express');
const router = express.Router();
const utilityController= require('../controllers/utilityController');
const { validate } = require('../middlewares/validators');
// const checkAuthMiddleware= require('../middlewares/checkAuth');
// const {signAccessToken}= require('../helper/jwt');

router.get('/',utilityController.getAll);
router.get('/sos',utilityController.getSOS);
router.post('/all-paging',utilityController.getallpaging);
router.get('/:id',utilityController.getbyID);
router.put('/:id',utilityController.update);
router.delete('/:id',utilityController.delete);
router.post('/',utilityController.create);  
router.get('/restore/:id',utilityController.restore);

module.exports= router;