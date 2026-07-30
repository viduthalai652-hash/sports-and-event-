import React from 'react';
import { X, Copy, Check, MessageCircle, Share2, Globe, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

const EventShareModal = ({ event, onClose }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!event) return null;

  const eventUrl = window.location.origin + '/?event=' + event.id;
  const shareText = `Join me at ${event.title} in ${event.city}! Registered via SRV Sports. Check it out: `;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    showToast('Event link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + eventUrl)}`, '_blank');
    showToast('Opening WhatsApp Share...', 'info');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`, '_blank');
    showToast('Opening Facebook Share...', 'info');
  };

  const handleInstagram = () => {
    navigator.clipboard.writeText(shareText + eventUrl);
    showToast('Event details copied! Open Instagram to share in Story or DM.', 'info');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(15, 41, 27, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '480px',
        width: '100%',
        padding: '32px 28px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        border: '1.5px solid #D4AF37',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
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

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFFDF5, #EAF2EA)',
            border: '2px solid #D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
            color: '#0F4C2C'
          }}>
            <Share2 size={24} />
          </div>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#0F4C2C', fontWeight: 800 }}>
            Share Event With Friends
          </h3>
          <p style={{ color: '#5E7A5E', fontSize: '0.9rem', marginTop: '6px', fontFamily: 'Poppins, sans-serif' }}>
            {event.title}
          </p>
        </div>

        {/* Social Share Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
          
          <button onClick={handleWhatsApp} style={socialBtnStyle('#25D366')}>
            <MessageCircle size={22} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '6px' }}>WhatsApp</span>
          </button>

          <button onClick={handleFacebook} style={socialBtnStyle('#1877F2')}>
            <Globe size={22} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '6px' }}>Facebook</span>
          </button>

          <button onClick={handleInstagram} style={socialBtnStyle('#E4405F')}>
            <Send size={22} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '6px' }}>Instagram</span>
          </button>

          <button onClick={handleCopyLink} style={socialBtnStyle('#0F4C2C')}>
            {copied ? <Check size={22} style={{ color: '#22C55E' }} /> : <Copy size={22} />}
            <span style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '6px' }}>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

        </div>

        {/* Direct Link Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#F8FAF8',
          border: '1.5px solid rgba(118, 163, 118, 0.4)',
          borderRadius: '12px',
          padding: '6px 12px'
        }}>
          <input
            type="text"
            readOnly
            value={eventUrl}
            style={{
              flexGrow: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '0.85rem',
              color: '#1C331C',
              outline: 'none'
            }}
          />
          <button
            onClick={handleCopyLink}
            className="btn btn-gold"
            style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '8px', flexShrink: 0 }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

      </div>
    </div>
  );
};

const socialBtnStyle = (color) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '14px 8px',
  borderRadius: '16px',
  background: '#F8FAF8',
  border: `1.5px solid ${color}30`,
  color: color,
  cursor: 'pointer',
  transition: 'transform 0.2s ease, background 0.2s ease'
});

export default EventShareModal;
