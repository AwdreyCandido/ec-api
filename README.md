# 🛒 NestJS E-commerce API 🚀

Uma **API de e-commerce** desenvolvida com **NestJS** e **TypeORM**, oferecendo endpoints para gerenciamento de produtos, pedidos, usuários e mais.  
Ideal para estudos e experimentação com arquitetura modular, autenticação e integração com banco de dados MySQL.

---

## ⚙️ Project Setup

Instale as dependências do projeto:

```bash
npm install
```

---

## 🗄️ Setup Acesso ao Banco de Dados Local

Configure o acesso ao banco de dados local no arquivo `data-source.ts` (ou equivalente):

```ts
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306, // substitua pelo seu porto
  username: 'username',
  password: 'password',
  database: 'ecommerce_test',
  entities: [
    // suas entidades aqui
  ],
  migrations: ['src/migrations/*.js'],
  synchronize: true,
});

export default AppDataSource;
```

> Substitua as credenciais acima pelas suas próprias.

---

## 🎲 Criar Banco de Dados de Teste

Antes de iniciar o projeto, crie o banco de dados MySQL:

```sql
-- Cria o banco de dados apenas se ele ainda não existir
CREATE DATABASE IF NOT EXISTS ecommerce_test;

-- Usa o banco recém-criado
USE ecommerce_test;
```

> Pode ser executado em **phpMyAdmin**, **MySQL Workbench**, **DBeaver** ou linha de comando.

---

## 🧩 Executar Migrations

1. Antes de rodar as migrations, altere a extensão das migrations de `.js` para `.ts` no arquivo de configuração:

```ts
migrations: ['src/migrations/*.ts'],
synchronize: false
```

2. Execute o comando abaixo para aplicar as migrations:

```bash
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./typeorm-cli.config.ts
```

---

## 🪄 Popular o Banco de Dados

Para popular o banco de dados com dados iniciais:

1. Copie ou envie o script `populate.db.sql` (ou `.ts`, se aplicável) para o diretório raiz do projeto.
2. Execute o script manualmente no seu cliente MySQL (phpMyAdmin, DBeaver ou MySQL Workbench).

---

## 🧠 Rodar o Projeto

Após rodar as migrations, altere novamente a extensão para `.js`:

```ts
migrations: ['src/migrations/*.js'],
synchronize: false
```

Execute o projeto:

```bash
# Development
npm run start

# Watch mode (auto-reload)
npm run start:dev

# Production
npm run start:prod
```

---

## 🧰 Tech Stack

- **NestJS** — Framework backend baseado em TypeScript
- **TypeORM** — ORM para integração com bancos de dados relacionais
- **MySQL** — Banco de dados relacional
- **Node.js** — Runtime de execução
