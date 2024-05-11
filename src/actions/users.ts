"use server";

import { db } from "@/db";
import { type User, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import bcrypt from "bcryptjs";

export async function getUserByUsername(username: string) {
    noStore();

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

    const hashedPassword = await bcrypt.hash(user.password, 8);
    user = { ...user, password: hashedPassword };

    return db.insert(users).values(user).returning();
}

export async function removeUser(id: number) {
    noStore();

    await db.delete(users).where(eq(users.id, id));
}
