import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CanvasParticles from '../components/CanvasParticles';
import Logo from '../components/Logo';
import { User, Mail, Lock, Phone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const LoginView = () => {
  const { loginUser, loginAdmin, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('login');

  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');

  const [adminId, setAdminId] = useState('admin');
  const [adminPass, setAdminPass] = useState('password123');

  const handleUserLoginSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) return;
    loginUser(userEmail, userEmail.split('@')[0]);
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    loginAdmin(adminId, adminPass);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(circle at 50% 30%, #F8FAF8 0%, #EFF4F0 60%, #E2ECE5 100%)',
      overflow: 'hidden'
    }}>
      {/* Background Floating Particle Dust */}
      <CanvasParticles />

      {/* Centered Glass Card */}
      <div className="glass-card" style={{
        maxWidth: '460px',
        width: '100%',
        padding: '36px 30px',
        position: 'relative',
        zIndex: 10,
        background: '#FFFFFF',
        border: '2px solid #D4AF37',
        boxShadow: '0 25px 60px rgba(15,76,44,0.12), var(--shadow-gold)'
      }}>
        
        {/* Logo at Top */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Logo size="lg" />
          <p style={{ color: '#4A6053', fontSize: '0.85rem', marginTop: '8px', fontFamily: 'Poppins, sans-serif' }}>
            Where Champions Begin Their Journey
          </p>
        </div>

        {/* Tab Selection: User Login & Admin Login */}
        <div style={{
          display: 'flex',
          background: '#F4F7F4',
          borderRadius: '999px',
          padding: '4px',
          marginBottom: '28px',
          border: '1px solid rgba(212,175,55,0.4)'
        }}>
          <button
            onClick={() => setActiveTab('login')}
            style={{
              flex: 1,
              padding: '10px 12px',
              border: 'none',
              borderRadius: '999px',
              background: activeTab === 'login' ? 'linear-gradient(135deg, #F7D358, #D4AF37)' : 'transparent',
              color: activeTab === 'login' ? '#0F4C2C' : '#4A6053',
              fontFamily: 'Cinzel, serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            User Login
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            style={{
              flex: 1,
              padding: '10px 12px',
              border: 'none',
              borderRadius: '999px',
              background: activeTab === 'admin' ? 'linear-gradient(135deg, #146B3A, #0F4C2C)' : 'transparent',
              color: activeTab === 'admin' ? '#FFFFFF' : '#4A6053',
              fontFamily: 'Cinzel, serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Admin Login
          </button>
        </div>

        {/* FORM 1: USER LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleUserLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>
                Email or Mobile Number
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0F4C2C' }} />
                <input
                  type="text"
                  required
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="glass-input"
                  style={{ width: '100%', paddingLeft: '44px' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: '#0F4C2C', fontWeight: 600 }}>Password</label>
                <span style={{ fontSize: '0.75rem', color: '#997A15', cursor: 'pointer', fontWeight: 600 }} onClick={() => showToast('Password reset link sent to email', 'info')}>
                  Forgot Password?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0F4C2C' }} />
                <input
                  type="password"
                  required
                  value={userPass}
                  onChange={e => setUserPass(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input"
                  style={{ width: '100%', paddingLeft: '44px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#4A6053' }}>
              <input type="checkbox" id="remember" defaultChecked style={{ accentColor: '#0F4C2C' }} />
              <label htmlFor="remember">Remember me on this browser</label>
            </div>

            <button type="submit" className="btn btn-gold" style={{ padding: '14px', fontSize: '0.95rem', marginTop: '6px' }}>
              Login to Account
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* FORM 3: ADMIN LOGIN */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div style={{
              background: '#FFFDF5',
              border: '1px solid #D4AF37',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#0F4C2C',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ShieldCheck size={20} style={{ flexShrink: 0, color: '#0F4C2C' }} />
              <span>Admin Authentication Portal (Default: Admin ID: <strong>admin</strong> | Pass: <strong>password123</strong>)</span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Admin ID</label>
              <div style={{ position: 'relative' }}>
                <ShieldCheck size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0F4C2C' }} />
                <input
                  type="text"
                  required
                  value={adminId}
                  onChange={e => setAdminId(e.target.value)}
                  placeholder="admin"
                  className="glass-input"
                  style={{ width: '100%', paddingLeft: '44px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Admin Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0F4C2C' }} />
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={e => setAdminPass(e.target.value)}
                  placeholder="password123"
                  className="glass-input"
                  style={{ width: '100%', paddingLeft: '44px' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-emerald" style={{ padding: '14px', fontSize: '0.95rem', marginTop: '6px' }}>
              <ShieldCheck size={18} />
              Access Admin Dashboard
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default LoginView;
