import { auth } from "@/auth";
import { UserForm } from "@/components/user-form";
import { UserTable } from "@/components/user-table";


export default async function UserPage() {
    const session = await auth()

    return <main>
        {session?.user?.role === "admin" && <UserForm />}
        <UserTable />
    </main>
} 
