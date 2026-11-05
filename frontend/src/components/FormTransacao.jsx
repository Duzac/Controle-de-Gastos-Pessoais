import { useState } from 'react';
import { api } from '../services/api';

function formularioVazio() {
  return {
    descricao: '',
    valor: '',
    tipo: 'despesa',
    data: new Date().toLocaleDateString('en-CA'),
    categoria_id: '',
  };
}

export default function FormTransacao({ categorias, editando, onSalvo, onCancelar, onNovaCategoria }) {
  const [form, setForm] = useState(() =>
    editando
      ? {
          descricao: editando.descricao,
          valor: String(editando.valor),
          tipo: editando.tipo,
          data: editando.data,
          categoria_id: editando.categoria_id ? String(editando.categoria_id) : '',
        }
      : formularioVazio()
  );
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  function campo(nome) {
    return (e) => setForm({ ...form, [nome]: e.target.value });
  }

  async function enviar(e) {
    e.preventDefault();
    setErro('');
    setSalvando(true);

    const corpo = {
      descricao: form.descricao,
      valor: Number(form.valor),
      tipo: form.tipo,
      data: form.data,
      categoria_id: form.categoria_id ? Number(form.categoria_id) : null,
    };

    try {
      if (editando) {
        await api(`/transactions/${editando.id}`, { method: 'PUT', body: corpo });
      } else {
        await api('/transactions', { method: 'POST', body: corpo });
        setForm(formularioVazio());
      }
      onSalvo();
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={enviar}>
      <h2>{editando ? 'Editar transação' : 'Nova transação'}</h2>

      <label>
        Descrição
        <input value={form.descricao} onChange={campo('descricao')} required />
      </label>

      <label>
        Valor (R$)
        <input type="number" step="0.01" min="0.01" value={form.valor} onChange={campo('valor')} required />
      </label>

      <label>
        Tipo
        <select value={form.tipo} onChange={campo('tipo')}>
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
      </label>

      <label>
        Data
        <input type="date" value={form.data} onChange={campo('data')} required />
      </label>

      <label>
        Categoria
        <select value={form.categoria_id} onChange={campo('categoria_id')}>
          <option value="">Sem categoria</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
      </label>

      <button type="button" className="secundario pequeno" onClick={onNovaCategoria}>
        + Nova categoria
      </button>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit" disabled={salvando}>
        {salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Adicionar'}
      </button>

      {editando && (
        <button type="button" className="secundario" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}