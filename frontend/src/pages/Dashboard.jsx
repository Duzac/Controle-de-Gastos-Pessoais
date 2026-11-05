import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { moeda, dataBR } from '../utils/formatar';
import FormTransacao from '../components/FormTransacao';
import GraficoCategorias from '../components/GraficoCategorias';

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export default function Dashboard() {
  const { usuario, sair } = useAuth();
  const hoje = new Date();

  const [mes, setMes] = useState(hoje.getMonth() + 1);
  const [ano, setAno] = useState(hoje.getFullYear());
  const [categoriaId, setCategoriaId] = useState('');
  const [transacoes, setTransacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [resumo, setResumo] = useState(null);
  const [editando, setEditando] = useState(null);
  const [erro, setErro] = useState('');

  const anos = [hoje.getFullYear() - 2, hoje.getFullYear() - 1, hoje.getFullYear(), hoje.getFullYear() + 1];

  async function carregar() {
    setErro('');
    try {
      const periodo = `mes=${mes}&ano=${ano}`;
      const filtroCategoria = categoriaId ? `&categoria_id=${categoriaId}` : '';

      const [lista, dadosResumo, listaCategorias] = await Promise.all([
        api(`/transactions?${periodo}${filtroCategoria}`),
        api(`/summary?${periodo}`),
        api('/categories'),
      ]);

      setTransacoes(lista);
      setResumo(dadosResumo);
      setCategorias(listaCategorias);
    } catch (err) {
      if (err.status === 401) {
        sair();
        return;
      }
      setErro(err.message);
    }
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mes, ano, categoriaId]);

  async function excluir(id) {
    if (!window.confirm('Excluir esta transação?')) return;
    try {
      await api(`/transactions/${id}`, { method: 'DELETE' });
      await carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function novaCategoria() {
    const nome = window.prompt('Nome da nova categoria:');
    if (!nome || !nome.trim()) return;
    try {
      await api('/categories', { method: 'POST', body: { nome } });
      await carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  function aoSalvar() {
    setEditando(null);
    carregar();
  }

  return (
    <main className="painel">
      <header className="topo">
        <h1>Olá, {usuario.nome}! 👋</h1>
        <button className="secundario" onClick={sair}>Sair</button>
      </header>

      <section className="filtros">
        <label>
          Mês
          <select value={mes} onChange={(e) => setMes(Number(e.target.value))}>
            {MESES.map((nome, i) => (
              <option key={nome} value={i + 1}>{nome}</option>
            ))}
          </select>
        </label>
        <label>
          Ano
          <select value={ano} onChange={(e) => setAno(Number(e.target.value))}>
            {anos.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>
        <label>
          Categoria
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </label>
      </section>

      {erro && <p className="erro">{erro}</p>}

      {resumo && (
        <section className="cards">
          <div className="card">
            <small>Receitas</small>
            <strong className="positivo">{moeda(resumo.receitas)}</strong>
          </div>
          <div className="card">
            <small>Despesas</small>
            <strong className="negativo">{moeda(resumo.despesas)}</strong>
          </div>
          <div className="card">
            <small>Saldo</small>
            <strong className={resumo.saldo >= 0 ? 'positivo' : 'negativo'}>{moeda(resumo.saldo)}</strong>
          </div>
        </section>
      )}

      <section className="colunas">
        <div className="bloco">
          <FormTransacao
            key={editando ? editando.id : 'novo'}
            categorias={categorias}
            editando={editando}
            onSalvo={aoSalvar}
            onCancelar={() => setEditando(null)}
            onNovaCategoria={novaCategoria}
          />
        </div>

        <div className="bloco">
          <h2>Despesas por categoria</h2>
          <GraficoCategorias dados={resumo ? resumo.despesasPorCategoria : []} />
        </div>
      </section>

      <section className="bloco" style={{ marginTop: 16 }}>
        <h2>Transações</h2>
        {transacoes.length === 0 ? (
          <p className="vazio">Nenhuma transação neste período.</p>
        ) : (
          <ul className="lista">
            {transacoes.map((t) => (
              <li key={t.id} className="item">
                <div>
                  <strong>{t.descricao}</strong>
                  <small>{dataBR(t.data)} · {t.categoria || 'Sem categoria'}</small>
                </div>
                <div className="acoes">
                  <span className={t.tipo === 'receita' ? 'positivo' : 'negativo'}>
                    {t.tipo === 'receita' ? '+' : '-'} {moeda(t.valor)}
                  </span>
                  <button className="secundario pequeno" onClick={() => setEditando(t)}>Editar</button>
                  <button className="perigo pequeno" onClick={() => excluir(t.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}