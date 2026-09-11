import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, PawPrint, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { pawCareUsers, type PawCareUser } from './auth';

export default function Login({ onLogin }: { onLogin: (user: PawCareUser) => void }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    const user = pawCareUsers.find(item => item.id.toLowerCase() === userId.trim().toLowerCase() && item.password === password);
    if (!user) {
      toast.error('Incorrect email or password.');
      return;
    }
    onLogin(user);
    toast.success(`Welcome, ${user.name}`);
    navigate('/dashboard', { replace: true });
  }

  return <div className="login-page">
    <section className="login-story">
      <Link className="brand" to="/"><span className="brand-mark"><PawPrint /></span>PAWCARE<span className="brand-dot">.</span></Link>
      <div>
        <div className="eyebrow">SECURE CARE WORKSPACE</div>
        <h1>One shared record.<br /><em>The right access.</em></h1>
        <p>Municipal teams, NGOs, veterinarians, volunteers and feeders each see the tools appropriate to their work.</p>
      </div>
      <div className="login-trust"><ShieldCheck size={22} /><span><b>Role-based access</b><small>Each team member sees only the tools assigned to their role.</small></span></div>
    </section>
    <main className="login-panel">
      <Link className="text-link" to="/"><ArrowLeft size={16} /> Back to PawCare</Link>
      <div className="login-box">
        <div className="login-icon"><LockKeyhole size={25} /></div>
        <h2>Sign in to your care workspace</h2>
        <p>Use your PawCare account to access your assigned workspace.</p>
        <form onSubmit={submit}>
          <label className="field">Email<input autoComplete="username" required type="email" value={userId} onChange={event => setUserId(event.target.value)} placeholder="name@pawcare.in" /></label>
          <div className="field"><label htmlFor="account-password">Password</label><span className="password-field"><input id="account-password" autoComplete="current-password" required type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter your password" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></div>
          <button className="button login-submit" type="submit">Sign in <ArrowRight size={17} /></button>
        </form>
        <div className="notice">Contact your PawCare administrator if you need an account or a password reset.</div>
      </div>
    </main>
  </div>;
}
