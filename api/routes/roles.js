const express= require ('express');
const router = express.Router();
const rolesController= require('../controllers/rolesController');
const { validate } = require('../middlewares/validators');



router.get('/',rolesController.get);
router.get('/all-paging',rolesController.getallpaging);
router.get('/modules/functions',rolesController.getcombine);
router.get('/modules',rolesController.getModules);
router.get('/:id',rolesController.getbyID);
router.put('/:id',rolesController.update);
router.delete('/:id',validate.validateCreateRoles(),rolesController.delete);
router.delete('/delete/:id',rolesController.destroy);
router.post('/',validate.validateCreateRoles(),rolesController.create);  
router.get('/restore/:id',rolesController.restore);

module.exports= router;