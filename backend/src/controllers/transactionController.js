const pool = require('../database/db');

const COLUNAS = `t.id, t.descricao, t.valor, t.tipo,
  to_char(t.data, 'YYYY-MM-DD') AS data,
  t.categoria_id, c.nome AS categoria`;

function validar(corpo) {
  const { descricao, valor, tipo, data } = corpo;

  if (!descricao || !descricao.trim()) return 'A descrição é obrigatória';
  if (typeof valor !== 'number' || !(valor > 0)) return 'O valor deve ser um número maior que zero';
  if (!['receita', 'despesa'].includes(tipo)) return 'O tipo deve ser "receita" ou "despesa"';
  if (data !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(data)) return 'A data deve estar no formato AAAA-MM-DD';

  return null;
}

async function categoriaDoUsuario(categoriaId, usuarioId) {
  if (categoriaId === undefined || categoriaId === null) return true;

  const resultado = await pool.query(
    'SELECT id FROM categorias WHERE id = $1 AND usuario_id = $2',
    [categoriaId, usuarioId]
  );
  return resultado.rows.length > 0;
}

async function listar(req, res) {
  const { mes, ano, categoria_id, tipo } = req.query;

  const condicoes = ['t.usuario_id = $1'];
  const valores = [req.usuarioId];

  if (mes && ano) {
    const inicio = `${ano}-${String(mes).padStart(2, '0')}-01`;
    valores.push(inicio);
    condicoes.push(
      `t.data >= $${valores.length}::date AND t.data < ($${valores.length}::date + INTERVAL '1 month')`
    );
  }

  if (categoria_id) {
    valores.push(categoria_id);
    condicoes.push(`t.categoria_id = $${valores.length}`);
  }

  if (tipo === 'receita' || tipo === 'despesa') {
    valores.push(tipo);
    condicoes.push(`t.tipo = $${valores.length}`);
  }

  try {
    const resultado = await pool.query(
      `SELECT ${COLUNAS}
       FROM transacoes t
       LEFT JOIN categorias c ON c.id = t.categoria_id
       WHERE ${condicoes.join(' AND ')}
       ORDER BY t.data DESC, t.id DESC`,
      valores
    );
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao listar transações' });
  }
}

async function criar(req, res) {
  const erroValidacao = validar(req.body);
  if (erroValidacao) return res.status(400).json({ erro: erroValidacao });

  const { descricao, valor, tipo, data, categoria_id } = req.body;

  try {
    if (!(await categoriaDoUsuario(categoria_id, req.usuarioId))) {
      return res.status(400).json({ erro: 'Categoria inválida' });
    }

    const inserida = await pool.query(
      `INSERT INTO transacoes (descricao, valor, tipo, data, usuario_id, categoria_id)
       VALUES ($1, $2, $3, COALESCE($4::date, CURRENT_DATE), $5, $6)
       RETURNING id`,
      [descricao.trim(), valor, tipo, data || null, req.usuarioId, categoria_id || null]
    );

    const resultado = await pool.query(
      `SELECT ${COLUNAS} FROM transacoes t
       LEFT JOIN categorias c ON c.id = t.categoria_id
       WHERE t.id = $1`,
      [inserida.rows[0].id]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao criar transação' });
  }
}

async function atualizar(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ erro: 'ID inválido' });

  const erroValidacao = validar(req.body);
  if (erroValidacao) return res.status(400).json({ erro: erroValidacao });

  const { descricao, valor, tipo, data, categoria_id } = req.body;

  try {
    if (!(await categoriaDoUsuario(categoria_id, req.usuarioId))) {
      return res.status(400).json({ erro: 'Categoria inválida' });
    }

    const atualizada = await pool.query(
      `UPDATE transacoes
       SET descricao = $1, valor = $2, tipo = $3,
           data = COALESCE($4::date, data), categoria_id = $5
       WHERE id = $6 AND usuario_id = $7
       RETURNING id`,
      [descricao.trim(), valor, tipo, data || null, categoria_id || null, id, req.usuarioId]
    );

    if (atualizada.rows.length === 0) {
      return res.status(404).json({ erro: 'Transação não encontrada' });
    }

    const resultado = await pool.query(
      `SELECT ${COLUNAS} FROM transacoes t
       LEFT JOIN categorias c ON c.id = t.categoria_id
       WHERE t.id = $1`,
      [id]
    );

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar transação' });
  }
}

async function excluir(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ erro: 'ID inválido' });

  try {
    const resultado = await pool.query(
      'DELETE FROM transacoes WHERE id = $1 AND usuario_id = $2 RETURNING id',
      [id, req.usuarioId]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Transação não encontrada' });
    }

    res.status(204).send();
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao excluir transação' });
  }
}

module.exports = { listar, criar, atualizar, excluir };