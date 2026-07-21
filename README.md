# Fincheck — API

API REST de controle financeiro pessoal: autenticação, contas bancárias, categorias e transações (receitas e despesas), com saldo calculado por conta e listagem paginada/filtrável de transações.

Este projeto foi construído como **estudo full stack**, acompanhando o curso **[JStack](https://jstack.com.br)**. É o backend que serve o [frontend](../frontend) também desenvolvido durante o curso.

## Stack

- **NestJS** (Node.js + TypeScript)
- **Prisma** com **PostgreSQL**
- **JWT** (`@nestjs/jwt`) para autenticação, com guard global e rotas públicas via decorator `@IsPublic`
- **bcryptjs** para hash de senha
- **class-validator** / **class-transformer** para validação e transformação de DTOs

## Módulos e rotas

| Módulo | Rotas |
|---|---|
| `auth` | `POST /auth/signup`, `POST /auth/signin` |
| `users` | `GET /users/me` |
| `bank-accounts` | `POST` `GET` `PUT /:id` `DELETE /:id` `/bank-accounts` |
| `categories` | `POST` `GET` `PUT /:id` `DELETE /:id` `/categories` |
| `transactions` | `POST` `GET` (paginado, filtros por mês/ano/conta/tipo) `PUT /:id` `DELETE /:id` `/transactions` |

Todas as rotas (exceto `auth`) exigem `Authorization: Bearer <token>` e operam apenas sobre os dados do usuário autenticado — a posse de cada recurso (conta, categoria) é validada antes de qualquer escrita.

O saldo de cada conta (`currentBalance`) é calculado a partir do saldo inicial somado às transações relacionadas, não é um campo armazenado.

## Modelo de dados

`User` → `BankAccount` → `Transaction` ← `Category`, todos com exclusão em cascata a partir do usuário (ver `prisma/schema.prisma`).

## Como rodar

Pré-requisito: um banco PostgreSQL acessível.

```bash
npm install
cp .env.example .env   # preencha DATABASE_URL e JWT_SECRET
npx prisma migrate dev
npm run start:dev
```

A API sobe por padrão em `http://localhost:3000`.

Outros scripts disponíveis: `npm run build`, `npm run lint`, `npm run test`.
