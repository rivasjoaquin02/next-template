# Next Template for Full-Stact Tecnichal Interview

This is ment for rapid prototyping and easy of use

## Features

- [ ] Auth + RBAC (w/ Next-Auth v5)
- [x] Database (w/ Drizzle ORM)
- [ ] UI Components (w/ Shadcn)
- [ ] Example CRUD (w/ Server Actions)
- [ ] Example Table & Form (w/ React Hook + Zod)

## Getting Started

1. Install Project

```sh
pnpm install
```

## Next-Auth v5

[Reference](https://authjs.dev/reference/nextjs)
[Getting Started](https://authjs.dev/getting-started)

```sh
# install
pnpm add next-auth@beta


# env variable
# generate a secret with `openssl rand -base64 33`
AUTH_SECRET=""
```

Encrypt/Decrypt Passwords

```sh
pnpm add bcryptjs
pnpm add -D @types/bcryptjs
```

## Drizzle ORM

[Docs](https://orm.drizzle.team/docs/overview)
[Schema](https://orm.drizzle.team/docs/sql-schema-declaration)

```sh
# install
pnpm add drizzle-orm pg
pnpm add -D drizzle-kit

# env variables

# drizzle.config.ts

# upload changes to schema
pnpm drizzle-kit push:pg
```
