# 💰 Controle de Gastos Pessoais

[🌐 Acessar aplicação](https://controle-de-gastos-pessoais.vercel.app/)

> Aplicação web full stack para controle de finanças pessoais, com autenticação, cadastro de receitas e despesas, filtros por período e categoria, e gráficos de resumo.

---

## 📌 Sobre o projeto

O Controle de Gastos Pessoais permite que o usuário registre suas receitas e despesas, organize tudo por categoria e acompanhe a evolução do saldo ao longo do tempo.

O projeto foi desenvolvido para praticar o desenvolvimento full stack, incluindo modelagem de banco de dados, criação de API REST, autenticação com JWT, interface responsiva e deploy em produção.

## ✨ Funcionalidades

- [x] Cadastro e login de usuários com autenticação JWT
- [x] Criação, edição e exclusão de receitas e despesas
- [x] Organização de transações por categorias
- [x] Filtros por mês e categoria
- [x] Painel com total de receitas, despesas e saldo
- [x] Gráfico de gastos por categoria
- [x] Interface responsiva para desktop e celular

## 📸 Screenshots

### Tela de login
![Tela de login](docs/login.png)

### Painel principal
![Painel completo](docs/dashboard.png)

### Versão mobile
![Versão para celular](docs/mobile.png)


## 🛠️ Tecnologias utilizadas

| Camada | Tecnologias |
|---|---|
| Front-end | React, Vite, Tailwind CSS, Recharts |
| Back-end | Node.js, Express |
| Banco de dados | PostgreSQL |
| Autenticação | JWT, bcrypt |
| Deploy | Vercel, Render, Neon |

## 🚀 Acesso à aplicação

**[Clique aqui para acessar o Controle de Gastos Pessoais](https://controle-de-gastos-pessoais.vercel.app/)**

**Observação:** Como o servidor utiliza hospedagem gratuita, ele pode entrar em estado de inatividade. Por isso, o primeiro acesso pode demorar alguns instantes enquanto o servidor é iniciado.

## 💻 Como executar localmente

### Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/Duzac/Controle-de-Gastos-Pessoais.git
cd Controle-de-Gastos-Pessoais
```

### 2. Configure o back-end

```bash
cd backend
npm install
```

Crie um arquivo `.env` dentro da pasta `backend`:

```env
PORT=3333
DATABASE_URL=postgresql://usuario:senha@localhost:5432/Controle-de-Gastos-Pessoais
JWT_SECRET=sua_chave_secreta_aqui
```

Inicie o servidor:

```bash
npm run dev
```

### 3. Configure o front-end

Em outro terminal:

```bash
cd frontend
npm install
```

Crie um arquivo `.env` dentro da pasta `frontend`:

```env
VITE_API_URL=http://localhost:3333
```

Inicie a aplicação:

```bash
npm run dev
```

## 🔌 Endpoints principais da API

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/register` | Cadastra um novo usuário |
| POST | `/auth/login` | Autentica o usuário e retorna o token JWT |
| GET | `/transactions` | Lista as transações do usuário |
| POST | `/transactions` | Cria uma transação |
| PUT | `/transactions/:id` | Atualiza uma transação |
| DELETE | `/transactions/:id` | Remove uma transação |
| GET | `/categories` | Lista as categorias |
| GET | `/summary` | Retorna o resumo financeiro |

As rotas protegidas exigem o cabeçalho `Authorization: Bearer <token>`.

## 📁 Estrutura do projeto

```text
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
├── docs/
└── README.md
```

## 📚 Aprendizados

- Modelagem de banco de dados relacional com PostgreSQL.
- Desenvolvimento de API REST com Node.js e Express.
- Autenticação e proteção de rotas utilizando JWT.
- Integração entre front-end e back-end.
- Desenvolvimento de interfaces responsivas com React.
- Deploy de aplicações full stack.

## 🔮 Melhorias futuras

- [ ] Exportação de relatórios em CSV.
- [ ] Metas de gastos por categoria.
- [ ] Implementação de modo escuro.
- [ ] Cadastro de gastos recorrentes.

## 👤 Autor

Gabriel Pereira Duzac

---

⭐ Se gostou do projeto, considere deixar uma estrela no repositório!
