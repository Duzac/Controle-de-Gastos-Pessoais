const pool = require('../database/db');

async function listar(req, res) {
  try {
    const resultado = await pool.query(
      'SELECT id, nome FROM categorias WHERE usuario_id = $1 ORDER BY nome',
      [req.usuarioId]
    );
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao listar categorias' });
  }
}

async function criar(req, res) {
  const { nome } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: 'O nome da categoria é obrigatório' });
  }

  try {
    const resultado = await pool.query(
      'INSERT INTO categorias (nome, usuario_id) VALUES ($1, $2) RETURNING id, nome',
      [nome.trim(), req.usuarioId]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    if (erro.code === '23505') {
      return res.status(409).json({ erro: 'Você já tem uma categoria com esse nome' });
    }
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao criar categoria' });
  }
}

module.exports = { listar, criar };