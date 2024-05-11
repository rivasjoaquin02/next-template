import { removeUser, getAllUsers } from "@/actions/users"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
// import { toast } from "sonner"


export async function UserTable() {
    const users = await getAllUsers()
    const total = 10

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>id</TableHead>
                    <TableHead>fullname</TableHead>
                    <TableHead>username</TableHead>
                    <TableHead>role</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) =>
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.fullname}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right">
                            <form action={async () => {
                                "use server"
                                await removeUser(user.id)
                                // toast.success("user removed", {
                                //     id: "remove-user",
                                //     // duration: 10000,
                                // })
                            }}>
                                <Button variant="secondary" type="submit">remove</Button>
                            </form>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">{total}</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">{total}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
