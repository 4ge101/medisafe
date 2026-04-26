import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../App';
// import './Login.css';

type Props = {
  login: (user: User) => void;
};

function Register({ login }: Props) {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const submit = (e) => {
    e.preventDefault();

    if (password.length < 3) {
      setError('Password must be at least 3 characters');
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      role: 'patient',
    };

    login(newUser);
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Create account</h2>
        <p className="subtitle">Join MediCare as a patient</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Choose a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary form-submit">
            Create Account
          </button>
        </form>

        <div className="login-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;