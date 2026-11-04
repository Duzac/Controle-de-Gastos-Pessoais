const express = require('express');
const autenticar = require('../middlewares/auth');
const { listar, criar, atualizar, excluir } = require('../controllers/transactionController');

const router = express.Router();

router.use(autenticar);
router.get('/', listar);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

module.exports = router;