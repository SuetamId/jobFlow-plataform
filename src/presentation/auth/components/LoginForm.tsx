'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/presentation/components/ui';
import { useAuthContext } from '../context/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loginWithRedirect } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const redirectPath = await loginWithRedirect({ email, password });
      router.push(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />

      <Button
        type="submit"
        variant="secondary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>

      <p className="text-center text-sm text-foreground-secondary">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-secondary hover:underline font-medium">
          Register
        </Link>
      </p>

      <div className="mt-4 p-3 bg-background-secondary rounded-md text-sm text-foreground-secondary">
        <p className="font-medium mb-2">Demo credentials:</p>
        <div className="space-y-1">
          <p><span className="font-medium">Candidate:</span> john@example.com / password123</p>
          <p><span className="font-medium">Recruiter:</span> sarah@techflow.io / password123</p>
        </div>
      </div>
    </form>
  );
}
