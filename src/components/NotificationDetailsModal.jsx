import React from 'react';
import { 
  X, Calendar, MapPin, Trophy, Download, Share2, Bookmark, CheckCircle2, 
  Clock, AlertTriangle, ShieldCheck, ExternalLink, FileText, ArrowRight, Sparkles 
} from 'lucide-react';

const NotificationDetailsModal = ({ notification, onClose, onBookmark, isBookmarked, onShare }) => {
  if (!notification) return null;

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
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        background: '#FFFFFF',
        borderRadius: '24px',
        overflowY: 'auto',
        boxShadow: '0 30px 60px rgba(0,0,0,0.35)',
        border: '1.5px solid #D4AF37'
      }} onClick={e => e.stopPropagation()}>

        {/* Modal Banner Header */}
        <div style={{ position: 'relative', height: '240px', background: '#0F4C2C', overflow: 'hidden' }}>
          {notification.image ? (
            <img src={notification.image} alt={notification.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0F4C2C 0%, #1C331C 100%)' }} />
          )}

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(15,76,44,0.92) 100%)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge-gold">
                  {notification.category || 'ANNOUNCEMENT'}
                </span>
                {notification.priority && (
                  <span style={{
                    background: notification.priority === 'Critical' ? '#DC2626' : '#D4AF37',
                    color: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: 800
                  }}>
                    {notification.priority}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {onBookmark && (
                  <button
                    onClick={onBookmark}
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: isBookmarked ? '#B88E14' : '#1C331C'
                    }}
                  >
                    <Bookmark size={18} fill={isBookmarked ? '#B88E14' : 'none'} />
                  </button>
                )}
                {onShare && (
                  <button
                    onClick={onShare}
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#0F4C2C'
                    }}
                  >
                    <Share2 size={18} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  style={{
                    background: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#1C331C'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 900, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              {notification.title}
            </h2>
          </div>
        </div>

        {/* Modal Main Content */}
        <div style={{ padding: '32px 30px' }}>

          {/* Metadata Row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '0.88rem',
            color: '#4A6053',
            paddingBottom: '20px',
            marginBottom: '24px',
            borderBottom: '1px solid #E5E7EB'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} style={{ color: '#0F4C2C' }} />
              <span>Published: {notification.date || 'Today'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} style={{ color: '#B88E14' }} />
              <span>Verified Host: <strong>{notification.organizer || 'SRV Sports Federation'}</strong></span>
            </div>
            {notification.readTime && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B88E14', fontWeight: 700 }}>
                <Sparkles size={14} />
                <span>{notification.readTime}</span>
              </div>
            )}
          </div>

          {/* Notification Timeline Pipeline */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F4C2C', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.8px' }}>
              Notification Timeline & Status Pipeline
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              textAlign: 'center'
            }}>
              {[
                { step: 'Published', done: true },
                { step: 'Reg. Open', done: true },
                { step: 'Reminder', done: true },
                { step: 'Deadline', done: false },
                { step: 'Event Kickoff', done: false }
              ].map((t, idx) => (
                <div key={idx} style={{
                  background: t.done ? '#FFFDF5' : '#F4F7F4',
                  border: t.done ? '1.5px solid #D4AF37' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '10px 8px'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: t.done ? '#B88E14' : '#6B7C72' }}>
                    {t.step}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: t.done ? '#0F4C2C' : '#9CA3AF', marginTop: '2px', fontWeight: 700 }}>
                    {t.done ? '✓ Completed' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Announcement Text */}
          <div style={{ color: '#1C331C', fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px', fontFamily: 'Poppins, sans-serif' }}>
            <p style={{ marginBottom: '16px' }}>{notification.content || notification.desc}</p>
            <p style={{ color: '#4A6053', fontSize: '0.92rem' }}>
              All registered athletes and team captains are advised to review the official competition rules and bring their digital scannable QR passes for entry at stadium gate checkpoints.
            </p>
          </div>

          {/* Official Attachments Downloads */}
          <div style={{
            background: '#F8FAF8',
            border: '1.5px solid rgba(118,163,118,0.3)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '28px'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F4C2C', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Download size={18} style={{ color: '#B88E14' }} />
              Official Downloadable Attachments & Guidelines
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Tournament Rulebook & Weight Classes (PDF)', size: '2.4 MB' },
                { name: 'Official Fixtures & Stadium Schedule (PDF)', size: '1.8 MB' },
                { name: 'Venue Entry & Gate Security Map (PDF)', size: '1.1 MB' }
              ].map((doc, idx) => (
                <div key={idx} style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(118,163,118,0.3)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={18} style={{ color: '#0F4C2C' }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1C331C' }}>{doc.name}</span>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${doc.name}...`)}
                    style={{
                      background: '#FFFDF5',
                      color: '#0F4C2C',
                      border: '1px solid #D4AF37',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={14} />
                    Download ({doc.size})
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
            <button
              onClick={onClose}
              style={{
                background: '#F4F7F4',
                color: '#1C331C',
                border: '1px solid #CBD5E1',
                borderRadius: '999px',
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Close Announcement
            </button>
            
            <button
              onClick={() => alert('Redirecting to tournament registration page...')}
              className="btn btn-gold"
              style={{ padding: '12px 32px', fontSize: '0.95rem', borderRadius: '999px' }}
            >
              Proceed to Tournament
              <ArrowRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NotificationDetailsModal;
