# 💰 Controle de Gastos Pessoais

> Aplicação web full stack para controle de finanças pessoais, com autenticação, cadastro de receitas e despesas, filtros por período e categoria, e gráficos de resumo.

![Tela principal do Controle de Gastos Pessoais](./docs/screenshot-dashboard.png)

<!-- Dica: troque a imagem acima por um GIF mostrando o sistema funcionando -->

---

## 📌 Sobre o projeto

O **Controle de Gastos Pessoais** permite que o usuário registre suas receitas e despesas, organize tudo por categoria e acompanhe a evolução do saldo ao longo do tempo.

O projeto foi desenvolvido para praticar o ciclo completo de um sistema web: modelagem de banco de dados, criação de uma API REST, autenticação segura, interface responsiva e deploy em produção.

### Problema que resolve

Muitas pessoas não sabem para onde vai o próprio dinheiro. O projeto oferece uma forma simples e visual de registrar gastos e entender hábitos de consumo, sem a complexidade de planilhas ou aplicativos pesados.

---

## ✨ Funcionalidades

- [x] Cadastro e login de usuários com autenticação via JWT
- [x] Criação, edição e exclusão de receitas e despesas
- [x] Organização por categorias (alimentação, transporte, lazer etc.)
- [x] Filtros por mês e por categoria
- [x] Painel com total de receitas, despesas e saldo
- [x] Gráfico de gastos por categoria
- [x] Interface responsiva (celular e desktop)

---

## 🛠️ Tecnologias

| Camada | Tecnologias |
|---|---|
| Front-end | React, Tailwind CSS, Recharts |
| Back-end | Node.js, Express |
| Banco de dados | PostgreSQL |
| Autenticação | JWT, bcrypt |
| Testes | Jest |
| Deploy | Vercel (front), Render (back), Neon (banco) |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- PostgreSQL (local ou na nuvem)
- Git

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Duzac/Controle-de-Gastos-Pessoais.git
cd Controle-de-Gastos-Pessoais
```

**Back-end**

```bash
cd backend
npm install
cp .env.example .env   # preencha as variáveis (veja abaixo)
npm run dev
```

**Front-end**

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

### Variáveis de ambiente

**backend/.env**

```env
PORT=3333
DATABASE_URL=postgresql://usuario:senha@localhost:5432/Controle-de-Gastos-Pessoais
JWT_SECRET=sua_chave_secreta_aqui
```

**frontend/.env**

```env
REACT_APP_API_URL=http://localhost:3333
```

---

## 🔌 Endpoints principais da API

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/register` | Cadastra um novo usuário |
| POST | `/auth/login` | Autentica e retorna o token JWT |
| GET | `/transactions` | Lista as transações do usuário (aceita filtros) |
| POST | `/transactions` | Cria uma transação |
| PUT | `/transactions/:id` | Atualiza uma transação |
| DELETE | `/transactions/:id` | Remove uma transação |
| GET | `/categories` | Lista as categorias |

> As rotas de transações e categorias exigem o header `Authorization: Bearer <token>`.

---

## 🧪 Testes

```bash
cd backend
npm test
```

---

## 📁 Estrutura do projeto

```
Controle-de-Gastos-Pessoais/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── database/
│   └── tests/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
└── README.md
```

---

## 📚 O que aprendi

- Modelagem de banco de dados relacional
- Criação de API REST com Node.js e Express
- Autenticação com JWT e proteção de rotas
- Consumo de API no React e gerenciamento de estado
- Deploy de aplicação full stack
- Organização de projeto com Git e commits semânticos

---

## 🔮 Próximos passos

- [ ] Exportação de relatórios em CSV
- [ ] Metas de gasto por categoria
- [ ] Modo escuro
- [ ] Gastos recorrentes

---

## 👤 Autor

**Gabriel Pereira Duzac**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabriel-duzac-4b3a05354/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Duzac)

---

⭐ Se o projeto te ajudou ou te interessou, deixe uma estrela no repositório!
