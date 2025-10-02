
import React, { useState } from 'react';

interface AuthViewProps {
  onLogin: (email?: string, password?: string) => void;
}

type AuthMode = 'signup' | 'login';

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [verificationSent, setVerificationSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authMode === 'signup') {
      setVerificationSent(true);
      (e.target as HTMLFormElement).reset();
      setEmail('');
      setPassword('');
    } else {
      onLogin(email, password);
    }
  };
  
  const handleAuthModeChange = (mode: AuthMode) => {
    setAuthMode(mode);
    setVerificationSent(false); // Reset message when switching tabs
  }
  
  const handleGoogleLogin = () => {
    // Google login doesn't use email/password form, logs in as regular user
    onLogin();
  }

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#e0f2fe',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style>{`
        @media (max-width: 900px) {
          .auth-illustration-container {
            display: none !important;
          }
          .auth-form-container {
            padding: 2rem !important;
          }
        }
      `}</style>
      <div className="auth-illustration-container" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
        background: 'linear-gradient(to bottom right, #e0f7fa, #d1e6f9)',
      }}>
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.866 10.5 16 12 16C13.5 16 18 11.866 18 8C18 4.68629 15.3137 2 12 2Z" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 16V20C9 21.1046 9.89543 22 11 22H13C14.1046 22 15 21.1046 15 20V16" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12L10 8L12 6L14 8L12 12Z" fill="#0c4a6e"/>
            </svg>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0c4a6e', marginLeft: '0.75rem' }}>Smearn</span>
        </div>
        <StudentsIllustration />
      </div>
      <div className="auth-form-container" style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.5rem 0' }}>Unlock Your Potential.</h1>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', margin: '0 0 2rem 0' }}>Smearn Smart.</h2>

        <div style={{ display: 'flex', marginBottom: '2rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '0.25rem' }}>
          <TabButton text="Sign Up" isActive={authMode === 'signup'} onClick={() => handleAuthModeChange('signup')} />
          <TabButton text="Log In" isActive={authMode === 'login'} onClick={() => handleAuthModeChange('login')} />
        </div>

        {verificationSent && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            backgroundColor: '#dcfce7',
            color: '#166534',
            borderRadius: '0.5rem',
            textAlign: 'center',
            border: '1px solid #86efac'
          }}>
            <strong>Success!</strong> A verification link has been sent to your email. Please check your inbox to activate your account.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155' }}>Email Address</label>
            <input type="email" id="email" required style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#334155' }}>Password</label>
            <input type="password" id="password" required style={inputStyle} minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          
          {authMode === 'signup' && (
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '1.5rem'}}>
              <input type="checkbox" id="terms" required style={{width: '16px', height: '16px', marginRight: '0.5rem'}}/>
              <label htmlFor="terms" style={{color: '#64748b', fontSize: '0.875rem'}}>I agree to the Terms of Service</label>
            </div>
          )}

          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>
            {authMode === 'signup' ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: '#94a3b8' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
          <span style={{ margin: '0 1rem', fontSize: '0.875rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#ffffff',
            color: '#334155',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'background-color 0.2s'
        }}>
          <GoogleIcon />
          Continue with Google
        </button>

      </div>
    </div>
  );
};

const TabButton: React.FC<{ text: string; isActive: boolean; onClick: () => void; }> = ({ text, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      flex: 1,
      padding: '0.5rem 0',
      border: 'none',
      borderRadius: '0.375rem',
      backgroundColor: isActive ? '#3b82f6' : 'transparent',
      color: isActive ? '#ffffff' : '#334155',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    }}
  >
    {text}
  </button>
);

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #cbd5e1',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.93H12.27V14.4H18.23C17.96 15.99 17.15 17.34 15.9 18.27V21.09H19.86C21.62 19.44 22.56 16.99 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12.27 23C15.22 23 17.7 22.03 19.86 20.09L15.9 18.27C14.91 18.96 13.68 19.38 12.27 19.38C9.55 19.38 7.22 17.62 6.33 15.13H2.25V17.99C4.34 21.08 8.01 23 12.27 23Z" fill="#34A853"/>
    <path d="M6.33 15.13C6.1 14.49 5.96 13.79 5.96 13.06C5.96 12.33 6.1 11.63 6.33 10.99V8.13H2.25C1.46 9.71 1 11.33 1 13.06C1 14.79 1.46 16.41 2.25 17.99L6.33 15.13Z" fill="#FBBC05"/>
    <path d="M12.27 6.62C13.78 6.62 15.04 7.14 15.95 7.99L19.92 4.02C17.7 2.08 15.22 1.12 12.27 1.12C8.01 1.12 4.34 3.92 2.25 7.13L6.33 9.99C7.22 7.5 9.55 5.62 12.27 5.62V6.62Z" fill="#EA4335"/>
    </svg>
);

const StudentsIllustration = () => (
  <svg viewBox="0 0 400 300" style={{ maxWidth: '500px', width: '100%' }}>
    {/* Ground */}
    <path d="M-20 280 H420 V300 H-20Z" fill="#fcd34d" />
    {/* Books */}
    <rect x="170" y="255" width="60" height="25" fill="#3b82f6" rx="2" />
    <rect x="175" y="240" width="50" height="15" fill="#10b981" rx="2" />
    <rect x="180" y="225" width="40" height="15" fill="#ef4444" rx="2" />
    
    {/* Student 1 (Left) */}
    <g transform="translate(80, 200)">
      <circle cx="25" cy="15" r="15" fill="#fecaca" /> {/* Head */}
      <path d="M10 30 C 15 50, 35 50, 40 30 Z" fill="#3b82f6" /> {/* Body */}
      <rect x="2" y="55" width="46" height="10" fill="#1e40af" rx="5" /> {/* Legs */}
      <rect x="15" y="35" width="20" height="25" fill="#ffffff" stroke="#9ca3af" rx="2" transform="rotate(10, 25, 45)" /> {/* Book */}
    </g>

    {/* Student 2 */}
    <g transform="translate(130, 190)">
      <circle cx="25" cy="15" r="15" fill="#a16207" /> {/* Head */}
      <path d="M10 30 C 15 50, 35 50, 40 30 Z" fill="#ef4444" /> {/* Body */}
      <rect x="2" y="65" width="46" height="10" fill="#4b5563" rx="5" /> {/* Legs */}
      <rect x="15" y="35" width="20" height="25" fill="#ffffff" stroke="#9ca3af" rx="2" transform="rotate(-5, 25, 45)" /> {/* Book */}
    </g>

    {/* Student 3 */}
    <g transform="translate(180, 185)">
      <circle cx="25" cy="15" r="15" fill="#fef08a" /> {/* Head */}
      <path d="M10 30 C 15 50, 35 50, 40 30 Z" fill="#10b981" /> {/* Body */}
      <rect x="2" y="70" width="46" height="10" fill="#a16207" rx="5" /> {/* Legs */}
      <rect x="15" y="35" width="20" height="25" fill="#ffffff" stroke="#9ca3af" rx="2" transform="rotate(5, 25, 45)" /> {/* Book */}
    </g>

    {/* Student 4 (Right) */}
    <g transform="translate(250, 200)">
      <circle cx="25" cy="15" r="15" fill="#fed7aa" /> {/* Head */}
      <path d="M10 30 C 15 50, 35 50, 40 30 Z" fill="#16a34a" /> {/* Body */}
      <rect x="2" y="55" width="46" height="10" fill="#1e3a8a" rx="5" /> {/* Legs */}
      <rect x="15" y="35" width="20" height="25" fill="#ffffff" stroke="#9ca3af" rx="2" transform="rotate(-10, 25, 45)" /> {/* Book */}
    </g>

  </svg>
);


export default AuthView;