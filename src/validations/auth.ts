import { newUserSchema } from "./users";

export const loginSchema = newUserSchema.pick({
    username: true,
    password: true,
});

// const loginSchema = z.object({
//     username: z.string().min(1, "Username is required"),
//     password: z.string().min(6, "Password must be more than 6 characters"),
// });
