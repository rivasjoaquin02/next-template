"use server";

import { db } from "@/db";
import { type User, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { hashPassword } from "./auth";

export async function getUserById(id: number) {
    const [userInDB] = await db.select().from(users).where(eq(users.id, id));
    return userInDB;
}

export async function getUserByUsername(username: string) {
    const [userInDB] = await db
        .select()
        .from(users)
        .where(eq(users.username, username));
    return userInDB;
}

export async function getAllUsers() {
    noStore();
    return db.select().from(users);
}

export async function addUser(user: User) {
    noStore();

    const hashedPassword = await hashPassword(user.password);
    user = { ...user, password: hashedPassword };

    return db.insert(users).values(user).returning();
}

export async function removeUser(id: number) {
    noStore();

    await db.delete(users).where(eq(users.id, id));
}
