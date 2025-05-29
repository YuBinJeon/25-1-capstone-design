
import { LoginForm } from '@/components/auth/LoginForm';
import { AuthManager } from '@/components/auth/AuthManager';
import { Droplet } from 'lucide-react';

export default function LoginPage() {
  return (
    <AuthManager isAuthPage={true}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Droplet className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-6 text-3xl font-extrabold text-foreground">
              SmartPool Login
            </h1>
            <p className="mt-2 text-muted-foreground">
              Access your pool management dashboard.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </AuthManager>
  );
}
