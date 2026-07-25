import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const f = e.target; setBusy(true);
    try {
      if (mode === 'login') await login(f.email.value, f.password.value);
      else await signup(f.email.value, f.password.value, f.name.value);
      toast({ title: 'Welcome', description: 'You are now signed in.' });
      navigate('/account');
    } catch { toast({ title: 'Authentication failed', description: 'Check your details and try again.', variant: 'destructive' }); }
    finally { setBusy(false); }
  };
  return (
    <>
      <Helmet><title>{mode === 'login' ? 'Sign In' : 'Create Account'} | Vishmaya Studio</title></Helmet>
      <div className="max-w-md mx-auto px-5 py-24">
        <h1 className="font-display text-4xl text-center mb-2">{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>
        <p className="text-center text-sm text-muted-foreground mb-8">{mode === 'login' ? 'Access your collector account.' : 'Join the Vishmaya collector community.'}</p>
        <form onSubmit={submit} className="glass-card p-8 space-y-4">
          {mode === 'signup' && <input name="name" placeholder="Name" className="w-full bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />}
          <input name="email" type="email" required placeholder="Email" className="w-full bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
          <input name="password" type="password" required minLength={8} placeholder="Password" className="w-full bg-secondary border hairline px-4 py-3 text-sm focus:border-primary outline-none" />
          <button disabled={busy} className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 disabled:opacity-60">{busy ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}</button>
        </form>
        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="w-full text-center text-sm text-muted-foreground mt-6 hover:text-primary">
          {mode === 'login' ? "Don't have an account? Create one" : 'Already have an account? Sign in'}
        </button>
      </div>
    </>
  );
};

export default LoginPage;
