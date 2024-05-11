"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { loginSchema } from "@/validations/auth";

const defaultValues = {
    username: "",
    password: "",
};

export async function login(prevState: any, formData: FormData) {
    try {
        const validatedFields = loginSchema.safeParse({
            username: formData.get("username"),
            password: formData.get("password"),
        });

        if (!validatedFields.success) {
            return {
                message: "validation error",
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        await signIn("credentials", formData);

        return {
            message: "success",
            errors: {},
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "credentials error",
                        errors: {
                            ...defaultValues,
                            credentials: "incorrect email or password",
                        },
                    };
                default:
                    return {
                        message: "unknown error",
                        errors: {
                            ...defaultValues,
                            unknown: "unknown error",
                        },
                    };
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut();
}
