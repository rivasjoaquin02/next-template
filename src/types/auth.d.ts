import type { Role } from "@/db/schema";
import type { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    id: number;
    role: Role;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: Role;
    }
}
