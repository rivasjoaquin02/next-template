import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./validations/auth";
import { getUserByUsername } from "./actions/users";
import bcrypt from "bcryptjs";

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                const validatedCredentials = loginSchema.safeParse(credentials);

                if (validatedCredentials.success) {
                    const { username, password } = validatedCredentials.data;
                    const user = await getUserByUsername(username);
                    if (!user) return null;

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordMatch)
                        return {
                            id: user.id.toString(),
                            name: user.username,
                            role: user.role,
                        };
                }

                return null;
            },
        }),
    ],
});
