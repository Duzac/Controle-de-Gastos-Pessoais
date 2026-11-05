const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export async function api(caminho, { method = 'GET', body } = {}) {
  const token = localStorage.getItem('token');

  const resposta = await fetch(`${API_URL}${caminho}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    const erro = new Error(dados.erro || 'Erro na requisição');
    erro.status = resposta.status;
    throw erro;
  }

  return dados;
}