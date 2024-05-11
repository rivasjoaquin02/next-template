import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

async function Protected() {
    const session = await auth();

    return (
        <form action={async () => {
            "use server"
            await signOut()
        }}
            className='h-screen flex flex-col justify-center items-center gap-4'
        >
            <div>
                <p className='text-white'>{session?.user?.name}</p>
                <p className='text-white'>{session?.user?.email}</p>
            </div>
            <Button type='submit' className='w-40' variant='secondary'>
                Sign Out
            </Button>
        </form>
    );
}

export default Protected;
