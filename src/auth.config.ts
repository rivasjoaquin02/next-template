import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    session: { strategy: "jwt" },
    // pages: {
    //     error: "/",
    //     signIn: "/",
    //     signOut: "/",
    // },
    callbacks: {
        authorized({ auth }) {
            const isAuthenticated = !!auth?.user;
            return isAuthenticated;
        },
    },
    providers: [],
};
