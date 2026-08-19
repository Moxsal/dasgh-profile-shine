import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useSeo } from '@/hooks/useSeo';
import { toast } from '@/hooks/use-toast';

const schema = z.object({
  email: z.string().trim().email({ message: 'Enter a valid email address' }).max(255),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(72),
});

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  useSeo({
    title: 'Admin Sign In | Das GH Ltd',
    description: 'Secure sign in for Das GH Ltd product catalog administrators.',
    canonicalPath: '/auth',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast({ title: 'Check your details', description: parsed.error.issues[0].message });
      return;
    }
    setBusy(true);
    const credentials = { email: parsed.data.email, password: parsed.data.password };
    const { error } =
      mode === 'signin'
        ? await supabase.auth.signInWithPassword(credentials)
        : await supabase.auth.signUp({
            ...credentials,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setBusy(false);

    if (error) {
      toast({ title: 'Sign in failed', description: error.message });
      return;
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gold-500/15 bg-navy-800 p-8">
        <h1 className="font-serif text-2xl text-gold-50">Das GH Ltd Admin</h1>
        <p className="mt-2 text-sm text-gold-100/60">
          Sign in to manage the products marketplace.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-xs uppercase tracking-wider text-gold-100/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-navy-900 border border-gold-500/20 px-3 py-2 text-gold-50 focus:outline-none focus:border-gold-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs uppercase tracking-wider text-gold-100/60">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-navy-900 border border-gold-500/20 px-3 py-2 text-gold-50 focus:outline-none focus:border-gold-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-gold-500 py-3 font-semibold text-navy-800 hover:bg-gold-400 transition-colors disabled:opacity-60"
          >
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="mt-4 text-sm text-gold-300 hover:text-gold-200"
        >
          {mode === 'signin' ? 'Need an account? Sign up' : 'Already registered? Sign in'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
