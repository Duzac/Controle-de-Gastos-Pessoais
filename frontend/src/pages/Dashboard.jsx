import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { usuario, sair } = useAuth();

  return (
    <main className="cartao">
      <h1>Olá, {usuario.nome}! 👋</h1>
      <p>Login funcionando. Aqui vai ficar o painel de gastos.</p>
      <button onClick={sair}>Sair</button>
    </main>
  );
}