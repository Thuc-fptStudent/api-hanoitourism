const express = require('express');
const router = express.Router();
const ecommerceController = require('../controllers/ecommerceController');
const { validate } = require('../middlewares/validators');


router.get('/', ecommerceController.getAll);
router.get('/all-paging', ecommerceController.getallpaging);
// router.get('/api/uploads/:path', ecommerceController.photo);
router.get('/:id', ecommerceController.getById);
router.post('/' ,ecommerceController.create);
router.put('/:id',ecommerceController.update);
router.delete('/delete/:id', ecommerceController.destroy);
router.delete('/:id', ecommerceController.delete);
router.get('/restore/:id', ecommerceController.restore);
// router.get('/photo/:name', ecommerceController.photo);

module.exports = router;