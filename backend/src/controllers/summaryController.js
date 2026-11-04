const pool = require('../database/db');

async function resumo(req, res) {
  const { mes, ano } = req.query;

  const condicoes = ['usuario_id = $1'];
  const valores = [req.usuarioId];

  if (mes && ano) {
    valores.push(`${ano}-${String(mes).padStart(2, '0')}-01`);
    condicoes.push(
      `data >= $${valores.length}::date AND data < ($${valores.length}::date + INTERVAL '1 month')`
    );
  }

  const where = condicoes.join(' AND ');

  try {
    const totais = await pool.query(
      `SELECT
         COALESCE(SUM(valor) FILTER (WHERE tipo = 'receita'), 0) AS receitas,
         COALESCE(SUM(valor) FILTER (WHERE tipo = 'despesa'), 0) AS despesas
       FROM transacoes
       WHERE ${where}`,
      valores
    );

    const porCategoria = await pool.query(
      `SELECT COALESCE(c.nome, 'Sem categoria') AS categoria, SUM(t.valor) AS total
       FROM transacoes t
       LEFT JOIN categorias c ON c.id = t.categoria_id
       WHERE ${where.replace(/usuario_id/g, 't.usuario_id').replace(/data/g, 't.data')}
         AND t.tipo = 'despesa'
       GROUP BY c.nome
       ORDER BY total DESC`,
      valores
    );

    const receitas = Number(totais.rows[0].receitas);
    const despesas = Number(totais.rows[0].despesas);

    res.json({
      receitas,
      despesas,
      saldo: receitas - despesas,
      despesasPorCategoria: porCategoria.rows.map((l) => ({
        categoria: l.categoria,
        total: Number(l.total),
      })),
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao gerar resumo' });
  }
}

module.exports = { resumo };