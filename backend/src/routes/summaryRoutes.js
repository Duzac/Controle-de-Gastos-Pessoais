const express = require('express');
const autenticar = require('../middlewares/auth');
const { resumo } = require('../controllers/summaryController');

const router = express.Router();

router.use(autenticar);
router.get('/', resumo);

module.exports = router;