import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
import { Mail, Phone, MapPin, Send, Share2, Globe, Video, MessageSquare, Award, Shield, ArrowRight } from 'lucide-react';

const Footer = () => {
  const { navigateTo, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    showToast('Subscribed to SRV Sports Newsletter!', 'success');
    setEmailInput('');
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #F4F7F4 0%, #E4ECE6 100%)',
      borderTop: '1px solid rgba(212, 175, 55, 0.4)',
      color: '#0F291B',
      paddingTop: '60px',
      paddingBottom: '30px',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          
          {/* Column 1: Brand & Bio */}
          <div>
            <div onClick={() => navigateTo('home')} style={{ cursor: 'pointer', marginBottom: '16px' }}>
              <Logo size="md" />
            </div>
            <p style={{
              color: '#4A6053',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '20px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              SRV – THE WINNING EDGE is India's premier sports event management platform. Connecting passionate organizers, elite athletes, and sports communities.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[Share2, Globe, Video, MessageSquare].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#social"
                  onClick={(e) => { e.preventDefault(); showToast('Connecting to SRV Social Media Channel', 'info'); }}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid #D4AF37',
                    color: '#0F4C2C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#0F4C2C';
                    e.currentTarget.style.color = '#F7D358';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.color = '#0F4C2C';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1.1rem',
              color: '#0F4C2C',
              marginBottom: '20px',
              letterSpacing: '1px',
              fontWeight: 800
            }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Featured Tournaments', view: 'events' },
                { name: 'Organizer Pricing Plans', view: 'pricing' },
                { name: 'Latest Platform News', view: 'notifications' },
                { name: 'About SRV Platform', view: 'about' },
                { name: 'Contact & Support', view: 'contact' },
                { name: 'Admin Portal', view: 'login' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigateTo(link.view)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#334A3E',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: 0,
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0F4C2C'}
                    onMouseLeave={e => e.currentTarget.style.color = '#334A3E'}
                  >
                    <ArrowRight size={14} style={{ color: '#D4AF37' }} />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1.1rem',
              color: '#0F4C2C',
              marginBottom: '20px',
              letterSpacing: '1px',
              fontWeight: 800
            }}>
              Headquarters
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem', color: '#334A3E' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={20} style={{ color: '#0F4C2C', flexShrink: 0 }} />
                <span>SRV Sports Tower, Level 8, Marine Drive Promenade, Mumbai, Maharashtra - 400020</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={18} style={{ color: '#0F4C2C', flexShrink: 0 }} />
                <span>+91 (022) 8888-9999 / +91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} style={{ color: '#0F4C2C', flexShrink: 0 }} />
                <span>support@srvsports.in</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '6px' }}>
                <Shield size={18} style={{ color: '#146B3A', flexShrink: 0 }} />
                <strong style={{ color: '#0F4C2C' }}>ISO 9001:2026 Certified Platform</strong>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1.1rem',
              color: '#0F4C2C',
              marginBottom: '20px',
              letterSpacing: '1px',
              fontWeight: 800
            }}>
              Subscribe to Updates
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#4A6053', marginBottom: '16px', lineHeight: 1.5 }}>
              Receive instant alerts for upcoming sports events, early-bird registrations, and winner announcements.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                className="glass-input"
                style={{ fontSize: '0.85rem' }}
                required
              />
              <button type="submit" className="btn btn-emerald" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
                <Send size={15} />
                Subscribe Now
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(212, 175, 55, 0.3)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.8rem',
          color: '#6B7C72'
        }}>
          <div>
            © 2026 <strong style={{ color: '#0F4C2C' }}>SRV – THE WINNING EDGE</strong>. All Rights Reserved. Designed for Excellence.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer', color: '#334A3E' }} onClick={() => showToast('Privacy Policy', 'info')}>Privacy Policy</span>
            <span style={{ cursor: 'pointer', color: '#334A3E' }} onClick={() => showToast('Terms of Service', 'info')}>Terms of Service</span>
            <span style={{ cursor: 'pointer', color: '#334A3E' }} onClick={() => showToast('Refund & Cancellation', 'info')}>Refund Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
