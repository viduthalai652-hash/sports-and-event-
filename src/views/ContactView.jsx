import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ContactView = () => {
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Tournament Partnership',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    showToast(`Thank you ${formData.name}! Your inquiry has been sent to SRV support.`, 'success');
    setFormData({ name: '', email: '', phone: '', subject: 'Tournament Partnership', message: '' });
  };

  return (
    <div style={{ padding: '60px 24px', minHeight: '85vh', background: '#F8FAF8' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px' }}>GET IN TOUCH</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.6rem', color: '#0F4C2C' }}>
            Contact SRV Executive Team
          </h1>
          <p style={{ color: '#4A6053', fontSize: '0.95rem', maxWidth: '600px', margin: '8px auto 0' }}>
            Have questions about hosting your tournament or participant registrations? We are here 24/7 to assist.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Contact Form */}
          <div className="glass-card" style={{ padding: '36px', background: '#FFFFFF' }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.4rem', marginBottom: '20px' }}>
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikramaditya"
                  className="glass-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Inquiry Topic</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="glass-input"
                  style={{ width: '100%' }}
                >
                  <option value="Tournament Partnership">Tournament Partnership / Hosting</option>
                  <option value="Participant Registration Help">Participant Registration Help</option>
                  <option value="Sponsorship & Marketing">Sponsorship & Marketing</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Your Message *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist your tournament or registration?"
                  className="glass-input"
                  style={{ width: '100%' }}
                />
              </div>

              <button type="submit" className="btn btn-gold" style={{ padding: '14px', fontSize: '0.95rem' }}>
                <Send size={18} />
                Submit Message
              </button>
            </form>
          </div>

          {/* Right Column: Office Coordinates & Map Embed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div className="glass-card" style={{ padding: '30px', background: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.25rem', marginBottom: '20px' }}>
                Head Office & Support
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.9rem', color: '#4A6053' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <MapPin size={22} style={{ color: '#0F4C2C', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0F4C2C' }}>SRV Sports Tower</strong>
                    <div>Level 8, Marine Drive Promenade, Mumbai, MH - 400020</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <Phone size={20} style={{ color: '#0F4C2C', flexShrink: 0 }} />
                  <div>+91 (022) 8888-9999 / +91 98765 43210</div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <Mail size={20} style={{ color: '#0F4C2C', flexShrink: 0 }} />
                  <div>support@srvsports.in</div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <Clock size={20} style={{ color: '#146B3A', flexShrink: 0 }} />
                  <div>Mon – Sat: 08:00 AM – 08:00 PM IST</div>
                </div>
              </div>
            </div>

            {/* Google Map Simulation Frame */}
            <div style={{
              height: '280px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1.5px solid #D4AF37',
              boxShadow: 'var(--shadow-card)'
            }}>
              <iframe
                title="SRV Headquarters Map"
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://maps.google.com/maps?q=Marine%20Drive%20Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactView;
