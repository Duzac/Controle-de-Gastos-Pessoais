const express = require('express');
const autenticar = require('../middlewares/auth');
const { listar, criar } = require('../controllers/categoryController');

const router = express.Router();

router.use(autenticar);
router.get('/', listar);
router.post('/', criar);

module.exports = router;