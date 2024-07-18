"use client"
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

const UnauthorizedPage = () => {
  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut();
        window.location.href = '/login';
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    handleSignOut();
  }, []);

  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default UnauthorizedPage;
