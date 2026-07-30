import React, { useState } from 'react';
import { X, Bell, Check, Mail, Smartphone, ShieldCheck, Save, Sparkles } from 'lucide-react';

const NotificationPreferencesModal = ({ onClose, onSave }) => {
  const [channels, setChannels] = useState({
    email: true,
    sms: true,
    push: true
  });

  const [categories, setCategories] = useState({
    cricket: true,
    football: true,
    marathon: true,
    kabaddi: false,
    badminton: true,
    deadlines: true,
    winners: true,
    platform: false
  });

  const handleSave = () => {
    if (onSave) onSave({ channels, categories });
    alert('Your SRV Notification Alert Preferences have been saved successfully!');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'rgba(10, 28, 18, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        position: 'relative',
        maxWidth: '620px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px 28px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.35)',
        border: '1.5px solid #D4AF37'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#FFFDF5',
              border: '1.5px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#B88E14'
            }}>
              <Bell size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#0F4C2C', fontWeight: 900 }}>
                Notification Preferences
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#5E7A5E', margin: 0 }}>Customize how & when you receive tournament alerts</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: '#F4F7F4',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1C331C'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Channels Section */}
        <div style={{ marginBottom: '24px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F4C2C', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
            Delivery Channels
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            {[
              { id: 'email', label: 'Email Alerts', icon: Mail },
              { id: 'sms', label: 'SMS Notifications', icon: Smartphone },
              { id: 'push', label: 'Push Notifications', icon: Bell }
            ].map(c => {
              const Icon = c.icon;
              const isChecked = channels[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => setChannels({ ...channels, [c.id]: !isChecked })}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: isChecked ? '1.5px solid #D4AF37' : '1px solid #E5E7EB',
                    background: isChecked ? '#FFFDF5' : '#F8FAF8',
                    color: isChecked ? '#0F4C2C' : '#6B7C72',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon size={16} style={{ color: isChecked ? '#B88E14' : '#6B7C72' }} />
                    <span>{c.label}</span>
                  </div>
                  {isChecked && <Check size={16} style={{ color: '#0F4C2C' }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sports & Topics Selection */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F4C2C', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
            Subscribed Sports & Alerts
          </h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { id: 'cricket', label: '🏏 Cricket' },
              { id: 'football', label: '⚽ Football' },
              { id: 'marathon', label: '🏃 Marathon' },
              { id: 'kabaddi', label: '🤼 Kabaddi' },
              { id: 'badminton', label: '🏸 Badminton' },
              { id: 'deadlines', label: '⏰ Deadlines & Fees' },
              { id: 'winners', label: '🏆 Winner Results' },
              { id: 'platform', label: '📢 Platform News' }
            ].map(item => {
              const isChecked = categories[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => setCategories({ ...categories, [item.id]: !isChecked })}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: isChecked ? '1.5px solid #D4AF37' : '1px solid #E5E7EB',
                    background: isChecked ? 'linear-gradient(135deg, #0F4C2C, #1C331C)' : '#FFFFFF',
                    color: isChecked ? '#FFFFFF' : '#1C331C',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.82rem'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
          <button
            onClick={onClose}
            style={{
              background: '#F4F7F4',
              color: '#1C331C',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 24px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            className="btn btn-gold"
            style={{ padding: '10px 28px', fontSize: '0.88rem', borderRadius: '999px' }}
          >
            <Save size={16} />
            Save Alert Preferences
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotificationPreferencesModal;
