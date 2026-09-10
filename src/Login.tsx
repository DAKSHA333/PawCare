import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Building2, Eye, EyeOff, HeartPulse, LockKeyhole, PawPrint, ShieldCheck, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { demoUsers, type DemoUser } from './auth';

export default function Login({ onLogin }: { onLogin: (user: DemoUser) => void }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    const user = demoUsers.find(item => item.id.toLowerCase() === userId.trim().toLowerCase() && item.password === password);
    if (!user) {
      toast.error('Incorrect demo email or password.');
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
        <div className="eyebrow">SECURE DEMO WORKSPACE</div>
        <h1>One shared record.<br /><em>The right access.</em></h1>
        <p>Municipal teams, NGOs, veterinarians, volunteers and feeders each see the tools appropriate to their work.</p>
      </div>
      <div className="login-trust"><ShieldCheck size={22} /><span><b>Role-based prototype access</b><small>Passwords and permissions are simulated in this browser.</small></span></div>
    </section>
    <main className="login-panel">
      <Link className="text-link" to="/"><ArrowLeft size={16} /> Back to PawCare</Link>
      <div className="login-box">
        <div className="login-icon"><LockKeyhole size={25} /></div>
        <h2>Sign in to your care workspace</h2>
        <p>Use one of the demo accounts to see its permitted navigation and actions.</p>
        <form onSubmit={submit}>
          <label className="field">Demo email<input autoComplete="username" required type="email" value={userId} onChange={event => setUserId(event.target.value)} placeholder="name@pawcare.demo" /></label>
          <div className="field"><label htmlFor="demo-password">Password</label><span className="password-field"><input id="demo-password" autoComplete="current-password" required type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter demo password" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></div>
          <button className="button login-submit" type="submit">Sign in <ArrowRight size={17} /></button>
        </form>
        <button className="credentials-toggle" onClick={() => setShowCredentials(!showCredentials)}>{showCredentials ? 'Hide' : 'View'} demo credentials</button>
        {showCredentials && <div className="credential-list">{demoUsers.map(user => <button key={user.id} onClick={() => { setUserId(user.id); setPassword(user.password); }}>
          <span className="credential-icon">{user.role.includes('Admin') ? <Building2 size={17} /> : user.role === 'Veterinarian' ? <HeartPulse size={17} /> : <Users size={17} />}</span>
          <span><b>{user.role}</b><small>{user.id} · {user.password}</small></span>
        </button>)}</div>}
        <div className="notice">Demo security only. Credentials and records are stored client-side and must not be used as production authentication.</div>
      </div>
    </main>
  </div>;
}
