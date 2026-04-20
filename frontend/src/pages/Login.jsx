import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);

  // Form State
  const [email, setEmail] = useState('hr@techmahindra.com');
  const [password, setPassword] = useState('hr123');
  const [name, setName] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [companyName, setCompanyName] = useState('');
  
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        // Handle Registration
        const payload = { email, password, name, role };
        if (role === 'RECRUITER') { payload.companyName = companyName; }
        
        await axios.post('http://localhost:8080/api/auth/register', payload);
        
        // Auto-login after registration
        const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
        login(response.data);
        routeUser(response.data.role);

      } else {
        // Handle Login
        const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
        login(response.data);
        routeUser(response.data.role);
      }
    } catch (err) {
      if (isRegistering) setError('Email might already be taken. Try a different one.');
      else setError('Invalid credentials. Please verify your details.');
    }
  };

  const routeUser = (userRole) => {
    if (userRole === 'ADMIN') navigate('/admin');
    else if (userRole === 'RECRUITER') navigate('/recruiter');
    else navigate('/');
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    // Clear out testing hints if moving to register
    if (!isRegistering) {
      setEmail('');
      setPassword('');
      setName('');
      setCompanyName('');
    } else {
      // Repopulate hints just in case
      setEmail('hr@techmahindra.com');
      setPassword('hr123');
    }
  };

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh', alignItems: 'center', gap: '4rem', padding: '0 2rem' }}>
      
      {/* Landing Page Content */}
      <div style={{ paddingRight: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          Discover your next <span style={{ color: 'var(--primary-color)' }}>incredible</span> career.
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          NexusJobs connects top talent with India's leading technology firms. Build your profile, recruit native talent, and oversee the platform effortlessly.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-main)' }}>500+</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Partner Firms</span>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'var(--border-color)' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-main)' }}>2M+</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Active Candidates</span>
          </div>
        </div>
      </div>

      {/* Login & Registration Portal */}
      <div className="form-container" style={{ width: '100%', maxWidth: '450px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
          {isRegistering ? 'Create an ' : 'Sign In to '}<span style={{ color: 'var(--primary-color)' }}>Nexus</span>
        </h2>
        
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {isRegistering ? "Join India's leading tech hub." : "Welcome back to your workspace."}
        </p>
        
        {!isRegistering && (
          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--bg-color)', borderLeft: '3px solid var(--primary-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
            <p style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}><strong>Quick Access Demo Credentials:</strong></p>
            <div style={{ display: 'grid', gridTemplateColumns: 'min-content 1fr', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <strong>Recruiter:</strong> <span style={{ whiteSpace: 'nowrap' }}>hr@techmahindra.com / hr123</span>
              <strong>Employee:</strong> <span style={{ whiteSpace: 'nowrap' }}>amit@gmail.com / emp123</span>
            </div>
          </div>
        )}

        {error && (
          <div style={{ padding: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="fade-in">
          
          {isRegistering && (
            <>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Legal Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" style={{ background: 'var(--surface-color)', padding: '0.7rem' }} required placeholder="Enter your name" />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Account Type (Role)</label>
                <select value={role} onChange={e => setRole(e.target.value)} className="form-control" style={{ background: 'var(--surface-color)', padding: '0.7rem' }}>
                  <option value="EMPLOYEE">I am an Employee (Job Seeker)</option>
                  <option value="RECRUITER">I am a Recruiter (Hiring Manager)</option>
                </select>
              </div>

              {role === 'RECRUITER' && (
                <div className="form-group fade-in" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Company Name</label>
                  <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="form-control" style={{ background: 'var(--surface-color)', padding: '0.7rem' }} required placeholder="e.g. Wipro, HCL" />
                </div>
              )}
            </>
          )}

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" style={{ background: 'var(--surface-color)', padding: '0.7rem' }} required placeholder="Enter your email" />
          </div>
          
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Secure Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" style={{ background: 'var(--surface-color)', padding: '0.7rem' }} required placeholder="Enter your password" />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 'bold' }}>
            {isRegistering ? 'Create Account &rarr;' : 'Authorize Access &rarr;'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}&nbsp;
            <button onClick={toggleMode} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold', padding: 0 }}>
              {isRegistering ? 'Sign In' : 'Create Free Account'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
