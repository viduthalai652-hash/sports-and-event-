import React from 'react';
import { useApp } from '../context/AppContext';
import Logo from '../components/Logo';
import { 
  ShieldCheck, Award, Zap, Users, Globe, Target, Eye, Flame, CheckCircle2, 
  Calendar, Ticket, Trophy, Smartphone, BarChart3, HelpCircle, ArrowRight, 
  Sparkles, Clock, Lock, Cpu, Layers
} from 'lucide-react';

const AboutView = () => {
  const { navigateTo } = useApp();

  return (
    <div style={{ padding: '60px 24px', minHeight: '85vh', background: '#F4F7F4' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* 1. HERO PLATFORM BANNER */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <Logo size="lg" />
          </div>
          <div className="badge-gold animate-pulse-gold" style={{ marginBottom: '16px', display: 'inline-flex' }}>
            <Sparkles size={14} />
            INDIA'S PREMIER SPORTS & EVENT ECOSYSTEM
          </div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: '#0F4C2C', marginBottom: '20px', lineHeight: 1.2 }}>
            Empowering Champions & Elevating Indian Sports Management
          </h1>
          <p style={{ color: '#4A6053', fontSize: '1.1rem', maxWidth: '840px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'Poppins, sans-serif' }}>
            <strong>SRV – THE WINNING EDGE</strong> is India’s all-in-one digital sports platform designed to connect athletes, organizers, sports academies, and fans. We streamline sports event management with real-time registrations, instant QR digital passes, verified leaderboard rankings, and transparent organizer economics.
          </p>
        </div>

        {/* 2. PLATFORM IMPACT STATS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '70px'
        }}>
          {[
            { metric: '500+', label: 'Tournaments Hosted', sub: 'National, State & District Level' },
            { metric: '120,000+', label: 'Registered Athletes', sub: 'Verified Player Profiles' },
            { metric: '50+', label: 'Sports Categories', sub: 'Cricket, Football, Marathon & More' },
            { metric: '100%', label: 'Instant Digital Passes', sub: 'Scannable QR Gate Passes' }
          ].map((stat, i) => (
            <div key={i} className="glass-card" style={{
              padding: '28px 20px',
              textAlign: 'center',
              background: '#FFFFFF',
              border: '1.5px solid rgba(118, 163, 118, 0.3)',
              borderRadius: '16px'
            }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', fontWeight: 900, color: '#0F4C2C', marginBottom: '4px' }}>
                {stat.metric}
              </div>
              <div style={{ fontWeight: 700, color: '#1C331C', fontSize: '1rem', marginBottom: '4px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6B7C72' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 3. CORE SERVICES PROVIDED BY SRV */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span className="badge-gold" style={{ marginBottom: '10px' }}>SERVICES OFFERED</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', color: '#0F4C2C' }}>
              Comprehensive Services & Solutions
            </h2>
            <p style={{ color: '#4A6053', fontSize: '1rem', maxWidth: '640px', margin: '10px auto 0' }}>
              Designed specifically for tournament organizers, sports clubs, athletes, and fans across India.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
            {[
              {
                icon: <Trophy size={28} style={{ color: '#0F4C2C' }} />,
                title: '1. Tournament & League Publishing',
                desc: 'End-to-end digital event hosting for T20 Cricket Leagues, State Kabaddi Clashes, Football Invitational Cups, National Marathons, Badminton & Esports. Complete with rules, prize pools, and schedules.'
              },
              {
                icon: <Ticket size={28} style={{ color: '#0F4C2C' }} />,
                title: '2. Real-Time Registration Engine',
                desc: 'Automated player registration pipeline supporting individual athletes, team entries, category selection, age verification, emergency contact collection, and instant receipt generation.'
              },
              {
                icon: <Smartphone size={28} style={{ color: '#0F4C2C' }} />,
                title: '3. QR Code Digital Gate Passes',
                desc: 'Zero-paperwork entry pass system. Every registered athlete gets a verified digital E-Pass with a scannable QR code for instant venue access and barcode check-in at official stadium gates.'
              },
              {
                icon: <BarChart3 size={28} style={{ color: '#0F4C2C' }} />,
                title: '4. Organizer Financial Dashboard',
                desc: 'Transparent pricing plans for organizers — Basic (100 free passes), Pay-Per-Event (0% ticket commission), and Pay-Per-Ticket (zero upfront cost). Includes revenue tracking and payouts.'
              },
              {
                icon: <Award size={28} style={{ color: '#0F4C2C' }} />,
                title: '5. Hall of Champions & Leaderboards',
                desc: 'Verified archiving of championship winners, runner-ups, gold medalists, tournament MVP awards, and official digitized certificates of participation for all competing athletes.'
              },
              {
                icon: <Lock size={28} style={{ color: '#0F4C2C' }} />,
                title: '6. Verified Player & Organizer Badges',
                desc: 'Bank-grade identity verification ensuring genuine organizers, authentic player rosters, anti-fraud ticketing protection, and 100% secure Razorpay payment gateway integration.'
              }
            ].map((service, idx) => (
              <div key={idx} className="glass-card" style={{
                padding: '32px',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(118, 163, 118, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: '#F2F7F2',
                  border: '1.5px solid #76A376',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {service.icon}
                </div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', color: '#0F4C2C', lineHeight: 1.3 }}>
                  {service.title}
                </h3>
                <p style={{ color: '#4A6053', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. VISION & MISSION */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          <div className="glass-card" style={{ padding: '36px', background: '#FFFFFF', borderRadius: '16px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: '#FFFDF5',
              border: '1px solid #D4AF37',
              color: '#0F4C2C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Eye size={28} />
            </div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#0F4C2C', marginBottom: '12px' }}>
              Our Vision
            </h3>
            <p style={{ color: '#4A6053', lineHeight: 1.7, fontSize: '0.94rem' }}>
              To build India’s most trusted sports network where every grassroot tournament, collegiate championship, and national league is organized with international standards, transparent governance, and digital excellence.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '36px', background: '#FFFFFF', borderRadius: '16px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: '#E8F5E9',
              border: '1px solid #146B3A',
              color: '#146B3A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Target size={28} />
            </div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#0F4C2C', marginBottom: '12px' }}>
              Our Mission
            </h3>
            <p style={{ color: '#4A6053', lineHeight: 1.7, fontSize: '0.94rem' }}>
              Empower sports managers with automated hosting workflows, zero-commission options, and scannable pass technologies while providing players with seamless event discovery, instant registration, and lifelong athletic recognition.
            </p>
          </div>
        </div>

        {/* 5. HOW IT WORKS WORKFLOW */}
        <div className="glass-card" style={{ padding: '48px 36px', marginBottom: '80px', background: '#FFFFFF', borderRadius: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge-gold" style={{ marginBottom: '10px' }}>WORKFLOW</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', color: '#0F4C2C' }}>
              How SRV Operates
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { step: '01', title: 'Explore & Filter Events', desc: 'Browse state and national tournaments filtered by Sport, City, Prize Pool, and Date.' },
              { step: '02', title: 'Review Details & Rules', desc: 'Inspect full venue details, reporting timing, eligibility criteria, and championship rules.' },
              { step: '03', title: 'Instant Registration', desc: 'Submit player/team info and receive instant digital confirmation with unique receipt numbers.' },
              { step: '04', title: 'Scan E-Pass & Compete', desc: 'Present scannable QR code pass at stadium gate check-in and compete for top honors.' }
            ].map((st, i) => (
              <div key={i} style={{
                background: '#F4F7F4',
                padding: '24px',
                borderRadius: '14px',
                borderLeft: '4px solid #76A376'
              }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', fontWeight: 900, color: '#76A376', marginBottom: '8px' }}>
                  {st.step}
                </div>
                <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#0F4C2C', marginBottom: '8px' }}>
                  {st.title}
                </h4>
                <p style={{ color: '#4A6053', fontSize: '0.86rem', lineHeight: 1.5 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. LEADERSHIP SHOWCASE */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px' }}>LEADERSHIP & ADVISORY</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', color: '#0F4C2C', marginBottom: '40px' }}>
            The Team Behind SRV
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Vikramaditya Rao', title: 'Founder & Managing Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
              { name: 'Dr. Ananya Sundaram', title: 'Head of Sports Operations', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
              { name: 'Siddharth Malhotra', title: 'Chief Product Officer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }
            ].map((member, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '28px 20px', textAlign: 'center', background: '#FFFFFF', borderRadius: '16px' }}>
                <img
                  src={member.img}
                  alt={member.name}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #D4AF37', objectFit: 'cover', margin: '0 auto 16px' }}
                />
                <h4 style={{ color: '#0F4C2C', fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                  {member.name}
                </h4>
                <p style={{ color: '#76A376', fontSize: '0.85rem', marginTop: '4px', fontWeight: 600 }}>{member.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. ORGANIZER CTA CALLOUT */}
        <div style={{
          background: 'linear-gradient(135deg, #1C331C 0%, #0F4C2C 100%)',
          borderRadius: '24px',
          padding: '48px 32px',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(15, 76, 44, 0.25)'
        }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', marginBottom: '16px' }}>
            Ready to Host Your Next Tournament on SRV?
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#EAF2EA', maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Join over 500+ organizers across India. Publish your sports event in under 5 minutes and leverage our 0% commission payment system and instant QR ticket check-ins.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('pricing')}
              className="btn btn-gold"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              View Organizer Pricing Tiers
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="btn btn-outline-gold"
              style={{ padding: '14px 32px', fontSize: '1rem', color: '#FFFFFF', borderColor: '#FFFFFF' }}
            >
              Contact Support Team
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutView;
