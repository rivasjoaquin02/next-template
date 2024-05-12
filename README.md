# Next Template for Full-Stack Tecnichal Interview

This is ment for rapid prototyping and easy of use

## Key Features

- [x] Authentication (w/ Next-Auth v5)
    - [x] Middleware
    - [x] Credentials Provider
    - [ ] Role Based Access Control
- [x] Database (w/ Drizzle ORM + Postgres)
- [x] Example Table (w/ React Hook + Zod)
- [x] Example Form (w/ Server Actions + Zod)
- [x] Components with Shadcn-ui (button, form, input, label, select, table)

## Getting Started

```sh
# install
git clone https://github.com/rivasjoaquin02/next-template
pnpm install

# setup env variables
vim .env

# run in dev
pnpm dev
```

## Docs

- [NextAuth - Docs](https://authjs.dev/getting-started)
- [Drizzle - Docs](https://orm.drizzle.team/docs/overview)
- [Drizzle - Schema](https://orm.drizzle.team/docs/sql-schema-declaration)

## Postgres Setup

```yaml
version: '3.8'
services:
  db:
    container_name: postgres
    image: postgres:alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 1234
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
  pgadmin:
    container_name: pgadmin4_container
    image: dpage/pgadmin4
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: 1234
    ports:
      - "5050:80"
```
