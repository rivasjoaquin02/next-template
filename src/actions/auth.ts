import bcrypt from "bcryptjs";
import { loginSchema } from "@/validations/auth";
import { getUserByUsername } from "./users";
import type { User } from "@/db/schema";

export async function getUser(credentials: {
    username: string;
    password: string;
}): Promise<User | null> {
    const validatedCredentials = loginSchema.safeParse(credentials);

    if (validatedCredentials.success) {
        const { username, password } = validatedCredentials.data;
        const user = await getUserByUsername(username);
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) return user;
    }
    return null;
}

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 8);
}
