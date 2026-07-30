import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRICING_PLANS } from '../data/mockData';
import { Check, ShieldCheck, Zap, Calculator, ArrowRight, HelpCircle } from 'lucide-react';

const PricingView = () => {
  const { navigateTo, showToast } = useApp();

  const [ticketPrice, setTicketPrice] = useState(500);
  const [participantsCount, setParticipantsCount] = useState(1200);

  const flatEventRevenue = (ticketPrice * participantsCount) - 4999;
  const perTicketRevenue = (ticketPrice * participantsCount) * (1 - 0.04);

  return (
    <div style={{ padding: '60px 24px', minHeight: '85vh', background: '#F8FAF8' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px' }}>ORGANIZER PRICING</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.6rem', color: '#0F4C2C' }}>
            Transparent & Flexible Pricing
          </h1>
          <p style={{ color: '#4A6053', fontSize: '0.98rem', maxWidth: '640px', margin: '10px auto 0' }}>
            Choose the perfect hosting plan for your sports event. Zero hidden platform charges or payment gateway markups.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          alignItems: 'stretch',
          marginBottom: '70px'
        }}>
          {PRICING_PLANS.map(plan => (
            <div
              key={plan.id}
              className="glass-card"
              style={{
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.highlighted ? '2.5px solid #D4AF37' : '1px solid rgba(212,175,55,0.4)',
                boxShadow: plan.highlighted ? 'var(--shadow-gold), 0 20px 40px rgba(0,0,0,0.1)' : 'var(--shadow-card)',
                transform: plan.highlighted ? 'scale(1.03)' : 'none',
                background: plan.highlighted 
                  ? '#FFFDF5' 
                  : '#FFFFFF'
              }}
            >
              {/* Highlighted Ribbon */}
              {plan.highlighted && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #F7D358, #D4AF37)',
                  color: '#0F4C2C',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '4px 16px',
                  borderRadius: '999px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontFamily: 'Cinzel, serif',
                  letterSpacing: '1px'
                }}>
                  HIGH VOLUME RECOMMENDED
                </div>
              )}

              {/* Card Header */}
              <div style={{ marginBottom: '24px' }}>
                <span className="badge-gold" style={{ marginBottom: '12px' }}>
                  {plan.badge}
                </span>

                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#0F4C2C', marginBottom: '8px' }}>
                  {plan.name}
                </h3>

                <p style={{ color: '#4A6053', fontSize: '0.85rem', lineHeight: 1.5, minHeight: '2.8em' }}>
                  {plan.description}
                </p>
              </div>

              {/* Price Tag */}
              <div style={{
                borderTop: '1px dashed rgba(212,175,55,0.4)',
                borderBottom: '1px dashed rgba(212,175,55,0.4)',
                padding: '20px 0',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '2.5rem', fontWeight: 900, color: '#0F4C2C' }}>
                    {plan.price}
                  </span>
                  <span style={{ color: '#6B7C72', fontSize: '0.85rem' }}>/ {plan.period}</span>
                </div>
              </div>

              {/* Feature List */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px', flexGrow: 1 }}>
                {plan.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.88rem', color: '#0F291B' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#E8F5E9',
                      color: '#0F4C2C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Check size={13} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => {
                  showToast(`Selected ${plan.name}. Redirecting to Organizer Onboarding...`, 'success');
                  navigateTo('login');
                }}
                className={plan.highlighted ? "btn btn-gold" : "btn btn-outline-gold"}
                style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
              >
                {plan.cta}
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* INTERACTIVE ORGANIZER PAYOUT ESTIMATOR */}
        <div className="glass-card" style={{ padding: '36px', maxWidth: '900px', margin: '0 auto', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <Calculator size={28} style={{ color: '#0F4C2C' }} />
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#0F4C2C' }}>
              Interactive Organizer Revenue Calculator
            </h3>
          </div>
          <p style={{ color: '#4A6053', fontSize: '0.9rem', marginBottom: '24px' }}>
            Adjust your expected ticket price and participant count to compare net earnings between Pay Per Event vs Pay Per Ticket plans.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '30px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#0F4C2C', marginBottom: '8px', fontWeight: 600 }}>
                Ticket Price (₹): <strong style={{ color: '#0F4C2C' }}>₹{ticketPrice}</strong>
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={ticketPrice}
                onChange={e => setTicketPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0F4C2C' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#0F4C2C', marginBottom: '8px', fontWeight: 600 }}>
                Estimated Participants: <strong style={{ color: '#0F4C2C' }}>{participantsCount}</strong>
              </label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={participantsCount}
                onChange={e => setParticipantsCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0F4C2C' }}
              />
            </div>
          </div>

          {/* Result Comparison Box */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            background: '#F4F7F4',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(212,175,55,0.4)'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#6B7C72', marginBottom: '4px' }}>ESTIMATED NET PAYOUT (PAY PER EVENT)</div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', fontWeight: 800, color: '#0F4C2C' }}>
                ₹{Math.max(0, flatEventRevenue).toLocaleString()}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6B7C72' }}>Flat ₹4,999 fee deducted; 100% ticket earnings kept</span>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: '#6B7C72', marginBottom: '4px' }}>ESTIMATED NET PAYOUT (PAY PER TICKET)</div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', fontWeight: 800, color: '#997A15' }}>
                ₹{Math.round(perTicketRevenue).toLocaleString()}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6B7C72' }}>4% processing fee deducted per sold ticket</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingView;
