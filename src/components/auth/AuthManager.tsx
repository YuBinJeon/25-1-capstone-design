
"use client";

import type React from 'react';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton'; // Using Skeleton for loading state

interface AuthManagerProps {
  children: React.ReactNode;
  isProtectedPage?: boolean; // True for pages like /dashboard, /admin
  isAuthPage?: boolean;      // True for /login page
}

export function AuthManager({ children, isProtectedPage = false, isAuthPage = false }: AuthManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isProtectedPage && !user) {
        router.push('/'); // Redirect to login if on protected page and not logged in
      } else if (isAuthPage && user) {
        router.push('/dashboard'); // Redirect to dashboard if on login page and logged in
      }
    }
  }, [user, loading, router, isProtectedPage, isAuthPage, pathname]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Skeleton className="h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  // If it's a protected page and user is not yet loaded or is null (and redirect hasn't happened), show loading or nothing.
  // This prevents flashing the protected content.
  if (isProtectedPage && !user) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Skeleton className="h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }
  
  // If it's an auth page and user is logged in (and redirect hasn't happened), show loading or nothing.
  if (isAuthPage && user) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Skeleton className="h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  return <>{children}</>;
}
