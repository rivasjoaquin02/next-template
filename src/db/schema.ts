// https://orm.drizzle.team/docs/sql-schema-declaration
// https://authjs.dev/getting-started/adapters/drizzle

import { pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const ROLES = ["admin", "user"] as const;

export const roles = pgEnum("role", ROLES);

export const users = pgTable("user", {
    id: serial("id").primaryKey(),
    fullname: varchar("fullname").notNull(),
    username: varchar("username", { length: 256 }).unique().notNull(),
    password: varchar("password").notNull(),
    role: roles("role").default("user").notNull(),
});

export type Role = (typeof ROLES)[number];

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
