
# BookBridge: Projeto Node.js com Prisma, Supabase, Redis, Express, Jest e Supertest

Este é um projeto backend desenvolvido com Node.js, utilizando diversas tecnologias para otimizar o desenvolvimento, gerenciamento de dados e testes. A API deste projeto foi documentada no Postman, e está disponível [aqui](https://documenter.getpostman.com/view/29686411/2sAY545e2y).

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Usar](#como-usar)
- [Contribuição](#contribuição)

---

## Sobre o Projeto

Este projeto foi desenvolvido para fornecer uma API backend robusta e eficiente, com integração ao Supabase (usando PostgreSQL como banco de dados) e suporte para caching com Redis. O Prisma é usado como ORM para facilitar o gerenciamento dos dados, enquanto o Express fornece uma estrutura rápida e minimalista para a criação de rotas. O projeto também conta com testes automatizados utilizando Jest e Supertest.

O projeto é uma API Restful, que é um sistema de gerenciamento de clubes de leituras.

## Tecnologias Utilizadas

- **Node.js**: Plataforma JavaScript para construir a API.
- **Express**: Framework web para gerenciar rotas e middlewares.
- **Prisma**: ORM para facilitar a manipulação e consulta de dados.
- **Supabase**: Plataforma de banco de dados (utilizando PostgreSQL) e autenticação.
- **Redis**: Utilizado para caching, aumentando a performance da aplicação.
- **Jest**: Framework de testes para Node.js.
- **Supertest**: Biblioteca para testar requisições HTTP em conjunto com Jest.

## Instalação e Configuração

### Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio


2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   PORT==
   DATABASE_URL=
   DIRECT_URL=
   JWT_SECRET_KEY=
   JWT_EXPIRES_IN=
   REDIS_HOST=
   REDIS_PORT=
   REDIS_PASSWORD=   
   ```

4. Configure o Prisma:

   Gere o cliente Prisma a partir do schema definido:

   ```bash
   npx prisma generate
   ```

5. Execute as migrações para criar as tabelas no banco de dados:

   ```bash
   npx prisma migrate dev
   ```

6. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   O servidor estará disponível em `http://localhost:3000`.

## Como Usar

A API oferece várias rotas para manipulação de dados e funcionalidades do projeto. A documentação completa está disponível no Postman, [neste link](https://documenter.getpostman.com/view/29686411/2sAY545e2y).

## Testes

Os testes foram implementados utilizando Jest e Supertest para garantir a integridade e funcionalidade da API. Para rodar os testes, utilize o comando:

```bash
npm test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou fazer pull requests. Para contribuições maiores, por favor, discuta as mudanças propostas antes de enviá-las.
