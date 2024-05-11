import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getUser } from "./actions/auth";
import { getUserById } from "./actions/users";

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
                const user = await getUser({
                    username: credentials.username as string,
                    password: credentials.password as string,
                });

                if (!user) return null;

                return {
                    id: user.id.toString(),
                    name: user.username,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(+token.sub);
            if (!existingUser) return token;

            token.role = existingUser.role;
            return token;
        },
        session({ session, token }) {
            session.user.id = token.sub;
            if (session.user && token.role)
                session.user.role = token.role as Role;
            return session;
        },
    },
});
