import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { moeda } from '../utils/formatar';

const CORES = ['#16a34a', '#2563eb', '#f59e0b', '#dc2626', '#8b5cf6', '#0891b2', '#db2777'];

export default function GraficoCategorias({ dados }) {
  if (!dados || dados.length === 0) {
    return <p className="vazio">Sem despesas neste mês.</p>;
  }

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={dados} dataKey="total" nameKey="categoria" outerRadius={90}>
            {dados.map((_, i) => (
              <Cell key={i} fill={CORES[i % CORES.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(valor) => moeda(valor)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}