
import type { Metadata } from 'next';
import { AuthManager } from '@/components/auth/AuthManager';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'SmartPool Dashboard',
  description: 'Manage your smart pool system.',
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthManager isProtectedPage={true}>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </AuthManager>
  );
}
