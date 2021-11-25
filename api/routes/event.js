const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { validate } = require('../middlewares/validators');


router.get('/', eventController.getAll);
router.get('/all-paging', eventController.getallpaging);
router.get('/images', eventController.getListImage);
router.get('/images/:id', eventController.getImage);
router.get('/:id', eventController.getById);
router.post('/' ,eventController.create);
router.put('/:id',eventController.update);
router.delete('/:id', eventController.delete);
router.get('/restore/:id', eventController.restore);

module.exports = router;