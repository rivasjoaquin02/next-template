import { users } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const newUserSchema = createInsertSchema(users, {
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be more than 6 characters"),
});
