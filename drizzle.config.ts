import { env } from "@/env.mjs";
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: { url: env.DATABASE_URL },
} satisfies Config;
