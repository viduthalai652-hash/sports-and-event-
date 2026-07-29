import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
import { Bell, ShieldCheck, User, Menu, X, Calendar, DollarSign, Star, Info, PhoneCall, Home, LogOut } from 'lucide-react';

const Navbar = () => {
  const { currentView, navigateTo, notifications, user, isAdmin, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300" style={{
      background: '#EAF5EB',
      borderBottom: '1px solid rgba(118, 163, 118, 0.15)',
      boxShadow: '0 2px 10px rgba(28, 51, 28, 0.03)'
    }}>
      <div style={{ width: '100%', padding: '0 40px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo (Far Left Edge) */}
        <div onClick={() => navigateTo('home')} style={{ cursor: 'pointer', flexShrink: 0 }}>
          <Logo size="md" />
        </div>

        {/* Right Side Group: Pushed 100% to Far Right Edge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginLeft: 'auto' }}>
          
          {/* Desktop Text Navigation Links + Pill Action Button */}
          <div className="desktop-nav-group" style={{ gap: '32px' }}>
            
            <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              {navItems.map(item => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isActive ? '#76A376' : '#1C331C',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: isActive ? 800 : 700,
                      fontSize: '0.98rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 0',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      whiteSpace: 'nowrap',
                      borderBottom: isActive ? '2.5px solid #76A376' : '2.5px solid transparent'
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.color = '#76A376';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.color = '#1C331C';
                    }}
                  >
                    <span>{item.label}</span>

                    {/* Unread Notifications Badge */}
                    {item.badge > 0 && (
                      <span style={{
                        background: '#EF4444',
                        color: '#FFFFFF',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '999px'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action CTA Pill Button */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <button
                  onClick={() => navigateTo('events')}
                  className="btn btn-fern"
                  style={{ borderRadius: '999px', padding: '10px 24px', fontSize: '0.92rem', fontWeight: 700, whiteSpace: 'nowrap' }}
                >
                  <User size={16} />
                  {user.name.split(' ')[0]}
                </button>
                <button
                  onClick={logout}
                  title="Logout"
                  style={{
                    background: '#FEE2E2',
                    border: '1px solid #FCA5A5',
                    color: '#DC2626',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('contact')}
                className="btn btn-fern"
                style={{
                  borderRadius: '999px',
                  padding: '10px 28px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(118, 163, 118, 0.35)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                Contact
              </button>
            )}

            {/* Admin / Login Shortcut */}
            <button
              onClick={() => navigateTo(isAdmin ? 'admin' : 'login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1C331C',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.9rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#76A376'}
              onMouseLeave={e => e.currentTarget.style.color = '#1C331C'}
            >
              <ShieldCheck size={16} />
              {isAdmin ? 'Admin' : 'Login'}
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="mobile-nav-toggle">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#76A376',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          style={{
            background: '#FFFFFF',
            borderTop: '1.5px solid #76A376',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
          className="md:hidden"
        >
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: currentView === item.id ? '#EAF2EA' : 'transparent',
                  border: currentView === item.id ? '1px solid #76A376' : 'none',
                  color: currentView === item.id ? '#1C331C' : '#3D5A3D',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600
                }}
              >
                <Icon size={18} style={{ color: '#76A376' }} />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{
                    background: '#EF4444',
                    color: '#FFF',
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    marginLeft: 'auto'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {isAdmin && (
              <button
                onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
                className="btn btn-gold"
              >
                <ShieldCheck size={18} />
                Admin Dashboard
              </button>
            )}
            {!user ? (
              <button
                onClick={() => { navigateTo('login'); setMobileMenuOpen(false); }}
                className="btn btn-fern"
              >
                <User size={18} />
                Login / Register
              </button>
            ) : (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="btn btn-outline-gold"
              >
                <LogOut size={18} />
                Logout ({user.name})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
