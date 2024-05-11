"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

export function AuthButton() {
    const session = useSession()

    if (session.status === "unauthenticated")
        return <Button onClick={() => signIn()}>Sign In</Button>

    return <Button onClick={() => signOut()}>
        {session.data?.user?.name} Sign out
    </Button>
}
