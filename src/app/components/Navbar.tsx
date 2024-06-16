'use client';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return(
        <nav className="bg-blue-400 w-full py-2">
        <div className="max-w-screen-lg mx-auto px-4 flex justify-between items-center h-10">

          <div className="text-white font-semibold text-2xl">
            Points Game
          </div>

            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center relative rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 w-32"
              style={{height: dropdownOpen ? 'auto' : 'auto' }}
            >

                {!user && (
                    <button className="flex-1 flex items-center h-full w-full justify-center"
                        onClick={() => window.location.href = '/api/auth/login'}
                    >
                    Login
                    </button>
                )}


                {user && (
                    <div className="flex-1 flex items-center h-full w-full justify-center">
                    {user.name}
                    {typeof user.picture === 'string' && (
                        <img src={user.picture} alt="User Picture" className="ml-2 rounded-full w-8 h-8" />
                    )}
                    </div>
                )}

                {dropdownOpen && user && (
                    <div className="absolute top-0 left-0 w-full flex-1 flex-col bg-blue-500 rounded-md shadow-lg">
                        <div className="flex-1 rounded-md py-2 hover:bg-blue-600 flex items-center justify-center">
                            {user.name}
                            {typeof user.picture === 'string' && (
                                <img src={user.picture} alt="User Picture" className="ml-2 rounded-full w-8 h-8" />
                            )}
                        </div>
                        <div className="flex-1 flex">
                            <button className="flex-1 rounded-md py-2 hover:bg-blue-600"
                            onClick={() => window.location.href = '/api/auth/logout'}
                            >
                            Logout
                            </button>
                        </div>
                        
                    </div>
                )}

            </button>
        </div>
      </nav>
              );
}