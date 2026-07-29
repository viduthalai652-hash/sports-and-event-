import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, CreditCard, ShieldCheck, Download, Printer, User, Phone, Mail, FileText, CheckCircle2, Ticket } from 'lucide-react';

const RegistrationModal = ({ event }) => {
  const { closeModal, registerForEvent, user } = useApp();
  const [step, setStep] = useState(1);
  const [issuedReceipt, setIssuedReceipt] = useState(null);

  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    email: user ? user.email : '',
    phone: '',
    gender: 'Male',
    dob: '2000-01-01',
    address: '',
    city: event.city,
    state: event.state,
    idType: 'Aadhaar Card',
    idNumber: '',
    teamName: '',
    category: event.sport === 'Running' ? '21K Half Marathon' : 'Open Male/Female Category',
    emergencyContact: '',
    paymentMethod: 'UPI'
  });

  if (!event) return null;

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    const newReg = registerForEvent({
      eventId: event.id,
      eventTitle: event.title,
      ...formData
    });
    setIssuedReceipt(newReg);
    setStep(4);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', background: '#FFFFFF' }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #146B3A 0%, #0F4C2C 100%)',
          borderBottom: '2px solid #D4AF37',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#FFFFFF'
        }}>
          <div>
            <div className="badge-gold" style={{ marginBottom: '4px', background: '#FFFFFF', color: '#0F4C2C' }}>
              <Ticket size={12} />
              Registration Form
            </div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', color: '#FFF' }}>
              {event.title}
            </h3>
          </div>
          <button
            onClick={closeModal}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFF',
              cursor: 'pointer'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Wizard Stepper Header */}
        {step < 4 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 24px',
            background: '#F4F7F4',
            borderBottom: '1px solid rgba(212,175,55,0.3)'
          }}>
            {[
              { num: 1, label: 'Participant Info' },
              { num: 2, label: 'Verification & Team' },
              { num: 3, label: 'Payment & Confirm' }
            ].map(s => (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: step === s.num ? '#0F4C2C' : step > s.num ? '#047857' : '#9CA3AF',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: step === s.num ? '#0F4C2C' : step > s.num ? '#146B3A' : '#E5E7EB',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}>
                  {step > s.num ? <Check size={14} /> : s.num}
                </div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Form Body */}
        <div style={{ padding: '24px', background: '#FFFFFF' }}>
          
          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="rahul@example.com"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={e => handleChange('gender', e.target.value)}
                    className="glass-input"
                    style={{ width: '100%' }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={e => handleChange('dob', e.target.value)}
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Emergency Contact Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.emergencyContact}
                    onChange={e => handleChange('emergencyContact', e.target.value)}
                    placeholder="+91 98765 00000"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="submit" className="btn btn-gold" style={{ padding: '10px 24px' }}>
                  Next: Verification & Team
                </button>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>ID Proof Type *</label>
                  <select
                    value={formData.idType}
                    onChange={e => handleChange('idType', e.target.value)}
                    className="glass-input"
                    style={{ width: '100%' }}
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Passport">Passport</option>
                    <option value="Voter ID">Voter ID</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>ID Proof Number / Document No *</label>
                  <input
                    type="text"
                    required
                    value={formData.idNumber}
                    onChange={e => handleChange('idNumber', e.target.value)}
                    placeholder="Enter ID Number"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Participation Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={e => handleChange('category', e.target.value)}
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Team Name (Optional)</label>
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={e => handleChange('teamName', e.target.value)}
                    placeholder="e.g. Royal Strikers FC"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>City & State</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => handleChange('city', e.target.value)}
                    placeholder="City"
                    className="glass-input"
                  />
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => handleChange('state', e.target.value)}
                    placeholder="State"
                    className="glass-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline-gold" style={{ padding: '10px 20px' }}>
                  Back
                </button>
                <button type="submit" className="btn btn-gold" style={{ padding: '10px 24px' }}>
                  Next: Payment Summary
                </button>
              </div>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={handleCompleteRegistration} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{
                background: '#F4F7F4',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(212,175,55,0.4)'
              }}>
                <h4 style={{ color: '#0F4C2C', fontFamily: 'Cinzel, serif', marginBottom: '12px' }}>Order Summary</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#4A6053' }}>Event Registration Pass</span>
                  <span style={{ fontWeight: 700, color: '#0F4C2C' }}>{event.fee === 0 ? 'FREE' : `₹${event.fee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#4A6053' }}>Platform Gateway Fee</span>
                  <span style={{ color: '#047857', fontWeight: 600 }}>₹0 (Waived)</span>
                </div>
                <div style={{
                  borderTop: '1px solid rgba(212,175,55,0.4)',
                  paddingTop: '10px',
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.1rem',
                  fontWeight: 800
                }}>
                  <span style={{ color: '#0F4C2C' }}>Total Payable</span>
                  <span style={{ color: '#0F4C2C', fontFamily: 'Cinzel, serif' }}>{event.fee === 0 ? 'FREE' : `₹${event.fee}`}</span>
                </div>
              </div>

              {event.fee > 0 && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '8px', fontWeight: 600 }}>Select Payment Method</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {['UPI / GPay / PhonePe', 'Credit / Debit Card', 'Net Banking'].map(pm => (
                      <button
                        key={pm}
                        type="button"
                        onClick={() => handleChange('paymentMethod', pm)}
                        style={{
                          background: formData.paymentMethod === pm ? '#FFFDF5' : '#FFFFFF',
                          border: formData.paymentMethod === pm ? '2px solid #D4AF37' : '1px solid #E5E7EB',
                          color: formData.paymentMethod === pm ? '#0F4C2C' : '#4A6053',
                          padding: '12px 8px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 600
                        }}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem', color: '#4A6053' }}>
                <ShieldCheck size={16} style={{ color: '#047857' }} />
                <span>256-bit encrypted secure checkout. Instant digital bib & receipt generation.</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button type="button" onClick={() => setStep(2)} className="btn btn-outline-gold" style={{ padding: '10px 20px' }}>
                  Back
                </button>
                <button type="submit" className="btn btn-gold" style={{ padding: '12px 30px', fontSize: '0.95rem' }}>
                  <CreditCard size={18} />
                  Confirm & Generate Receipt
                </button>
              </div>
            </form>
          )}

          {/* STEP 4 */}
          {step === 4 && issuedReceipt && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
              
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #146B3A, #0F4C2C)',
                border: '2px solid #D4AF37',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.4rem' }}>Registration Confirmed!</h3>
                <p style={{ color: '#4A6053', fontSize: '0.9rem' }}>
                  Your spot in <strong style={{ color: '#0F4C2C' }}>{event.title}</strong> is locked in.
                </p>
              </div>

              {/* Digital Pass / Receipt Box */}
              <div id="srv-printable-receipt" style={{
                background: '#FFFDF5',
                border: '2px solid #D4AF37',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'left',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                position: 'relative'
              }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #D4AF37', paddingBottom: '16px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, color: '#0F4C2C', fontSize: '1.2rem' }}>
                      SRV DIGITAL ENTRY PASS
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>OFFICIAL VERIFIED PARTICIPANT</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#6B7C72' }}>RECEIPT NO</div>
                    <div style={{ fontWeight: 700, color: '#0F4C2C', fontFamily: 'monospace' }}>{issuedReceipt.receiptNo}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <span style={{ color: '#6B7C72', fontSize: '0.75rem' }}>PARTICIPANT:</span>
                      <div style={{ fontWeight: 700, color: '#0F4C2C' }}>{issuedReceipt.fullName}</div>
                    </div>
                    <div>
                      <span style={{ color: '#6B7C72', fontSize: '0.75rem' }}>CATEGORY:</span>
                      <div style={{ color: '#997A15', fontWeight: 600 }}>{issuedReceipt.category}</div>
                    </div>
                    <div>
                      <span style={{ color: '#6B7C72', fontSize: '0.75rem' }}>DATE & VENUE:</span>
                      <div style={{ color: '#0F291B' }}>{event.date} @ {event.venue}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(issuedReceipt.receiptNo)}`}
                      alt="QR Receipt"
                      style={{ width: '90px', height: '90px', borderRadius: '8px', border: '2px solid #D4AF37' }}
                    />
                    <span style={{ fontSize: '0.65rem', color: '#6B7C72', marginTop: '4px' }}>SCAN AT VENUE</span>
                  </div>
                </div>

              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={handlePrint} className="btn btn-outline-gold" style={{ padding: '10px 20px' }}>
                  <Printer size={16} />
                  Print / Save Pass
                </button>
                <button onClick={closeModal} className="btn btn-gold" style={{ padding: '10px 24px' }}>
                  Done & Close
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default RegistrationModal;
