import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Home.css';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '📅',
      title: 'Easy Appointments',
      desc: 'Book appointments with your doctor in just a few clicks. No phone calls needed.'
    },
    {
      icon: '📋',
      title: 'Health Records',
      desc: 'View your medical history, prescriptions, and test results all in one place.'
    },
    {
      icon: '🩺',
      title: 'Verified Doctors',
      desc: 'All doctors on our platform are licensed and verified medical professionals.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      desc: 'Your health data is encrypted and never shared without your consent.'
    },
  ];

  return (
    <div>
      <div className="home-hero">
        <span className="hero-tag">🏥 Trusted Healthcare Platform</span>
        <h1>Your Health, <span>Managed Simply</span></h1>
        <p>Book appointments, access your records, and connect with verified doctors — all in one place.</p>
        <div className="hero-buttons">
          <Link to="/register">
            <button className="btn-primary">Get Started Free</button>
          </Link>
          <Link to="/login">
            <button className="btn-outline">I have an account</button>
          </Link>
        </div>
      </div>

      <div className="home-features">
        <h2>Everything you need for your health</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="home-cta">
        <h2>Ready to take control of your health?</h2>
        <p>Join thousands of patients who manage their care with MediCare.</p>
        <button className="btn-white" onClick={() => navigate('/register')}>
          Create Your Account
        </button>
      </div>
    </div>
  );
}

export default Home;