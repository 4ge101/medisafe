import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../App';
// import './Login.css';

const FAKE_USERS: User[] = [
  { id: 1, name: 'John Doe', email: 'patient@test.com', role: 'patient' },
  { id: 2, name: 'Sarah Smith', email: 'doctor@test.com', role: 'doctor' },
];

const PASSWORDS: Record<string, string> = {
  'patient@test.com': '123',
  'doctor@test.com': '123',
};

type Props = {
  login: (user: User) => void;
};

function Login({ login }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    setError('');

    const found = FAKE_USERS.find(u => u.email === email && PASSWORDS[u.email] === password);

    if (found) {
      login(found);
      navigate('/dashboard');
    } else {
      setError('Wrong email or password. Try patient@test.com / 123');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome back</h2>
        <p className="subtitle">Sign in to your MediCare account</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary form-submit">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;