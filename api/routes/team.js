const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { validate } = require('../middlewares/validators');

router.get('/', teamController.getAll);
router.get('/all-paging', teamController.getallpaging);
router.post('/', validate.validateTeam(), teamController.create);
router.get('/:id', teamController.getById);
router.put('/:id', validate.validateTeam(), teamController.update);
router.delete('/delete/:id', teamController.destroy);
router.delete('/:id', teamController.delete);
router.get('/restore/:id', teamController.restore);

module.exports = router;