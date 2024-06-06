'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {

    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return(
        <nav className="bg-blue-400 w-full py-2">
            <div className="max-w-screen-lg mx-auto px-4 flex justify-center">
                <span className="text-white font-semibold text-lg">Hello World</span>
                <div>
                    {/* Conditional rendering of login/logout button based on user authentication */}
                    {!user && (
                        <a href="/api/auth/login" className="text-white hover:underline">Login</a>
                    )}
                    {user && (
                        <a href="/api/auth/logout" className="text-white hover:underline">Logout</a>
                    )}
                </div>
            </div>
        </nav>
    );
}