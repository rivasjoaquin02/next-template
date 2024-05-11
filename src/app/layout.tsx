import type { Metadata } from 'next';
import './globals.css';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'Next Template',
    description: 'Next Auth Middleware Authentication',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <html lang='en'>
                <body className="dark p-4">
                    {children}
                </body>
            </html>
        </SessionProvider>
    );
}
