'use client';

import { RegisterForm, GuestGuard } from '@/presentation/auth';
import { Card } from '@/presentation/components/ui';

export default function RegisterPage() {
  return (
    <GuestGuard>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Create an account</h1>
            <p className="text-foreground-secondary mt-2">
              Join JobFlow and find your dream job
            </p>
          </div>

          <Card>
            <RegisterForm />
          </Card>
        </div>
      </div>
    </GuestGuard>
  );
}
