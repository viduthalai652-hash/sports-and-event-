import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Logo from '../components/Logo';
import { 
  ShieldCheck, Award, Zap, Users, Globe, Target, Eye, Flame, CheckCircle2, 
  Calendar, Ticket, Trophy, Smartphone, BarChart3, HelpCircle, ArrowRight, 
  Sparkles, Clock, Lock, Cpu, Layers, ChevronLeft, ChevronRight, Pause, PlayCircle, FileText
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Explore & Filter Events',
    desc: 'Browse state and national tournaments filtered by Sport, City, Prize Pool, and Date. Search 50+ athletic competitions across India.',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    tag: 'STEP 1: DISCOVERY'
  },
  {
    step: '02',
    title: 'Review Details & Rules',
    desc: 'Inspect full venue locations, reporting timings, official eligibility criteria, weight categories, and championship prize pools.',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    tag: 'STEP 2: ELIGIBILITY'
  },
  {
    step: '03',
    title: 'Instant Registration',
    desc: 'Submit athlete info, roster choices, emergency contact details, and receive instant digital confirmation receipts.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80',
    tag: 'STEP 3: CHECKOUT'
  },
  {
    step: '04',
    title: 'Scan E-Pass & Compete',
    desc: 'Present your verified digital E-Pass with scannable QR code at official stadium gate check-ins and compete for glory.',
    icon: Ticket,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    tag: 'STEP 4: ARENA ENTRY'
  }
];

const AboutView = () => {
  const { navigateTo } = useApp();
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [isWorkflowAutoPlaying, setIsWorkflowAutoPlaying] = useState(true);

  // Auto-slide workflow steps interval
  useEffect(() => {
    if (!isWorkflowAutoPlaying) return;
    const interval = setInterval(() => {
      setWorkflowIndex(prev => (prev + 1) % WORKFLOW_STEPS.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [isWorkflowAutoPlaying]);

  const handleNextWorkflow = () => {
    setWorkflowIndex(prev => (prev + 1) % WORKFLOW_STEPS.length);
  };

  const handlePrevWorkflow = () => {
    setWorkflowIndex(prev => (prev - 1 + WORKFLOW_STEPS.length) % WORKFLOW_STEPS.length);
  };

  return (
    <div style={{ paddingTop: '0px', paddingBottom: '60px', minHeight: '85vh', background: '#F8FAF8' }}>
      {/* 1. HERO PLATFORM BANNER WITH FULL-BLEED 100VW BACKGROUND (0px Upper Gap, 0px Side Gaps) */}
      <div style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        marginTop: '0px',
        marginBottom: '50px',
        padding: '65px 24px 55px',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '380px'
      }}>
        {/* Full-Width Vivid Background Sports Silhouette Banner Image */}
        <img
          src="/about-sports-banner.jpg"
          alt="Multi-Colored Sports Silhouettes Banner"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            zIndex: 0,
            opacity: 1
          }}
        />

        {/* Banner Hero Text Content with Ultra-Crisp White Backlight Text-Shadows */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1080px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <Logo size="lg" />
          </div>
          <div className="badge-gold animate-pulse-gold" style={{
            marginBottom: '18px',
            display: 'inline-flex',
            padding: '8px 22px',
            fontSize: '0.88rem',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '2px solid #D4AF37',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            fontWeight: 800
          }}>
            <Sparkles size={16} style={{ color: '#B88E14' }} />
            INDIA'S PREMIER SPORTS & EVENT ECOSYSTEM
          </div>
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2.3rem, 4.8vw, 3.6rem)',
            color: '#0F4C2C',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: '0',
            textShadow: '0 0 22px #FFFFFF, 0 0 38px #FFFFFF, 0 3px 14px rgba(255,255,255,1), 0 2px 5px rgba(0,0,0,0.6)'
          }}>
            Empowering Champions & <br />
            <span style={{ color: '#1C331C', textShadow: '0 0 22px #FFFFFF, 0 0 38px #FFFFFF, 0 3px 14px rgba(255,255,255,1), 0 2px 5px rgba(0,0,0,0.6)' }}>Elevating Indian Sports Management</span>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

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
                desc: 'End-to-end digital event hosting for T20 Cricket Leagues, State Kabaddi Clashes, Football Invitational Cups, National Marathons, Badminton & Esports. Complete with rules, prize pools, and schedules.',
                image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=800&q=80'
              },
              {
                icon: <Ticket size={28} style={{ color: '#0F4C2C' }} />,
                title: '2. Real-Time Registration Engine',
                desc: 'Automated player registration pipeline supporting individual athletes, team entries, category selection, age verification, emergency contact collection, and instant receipt generation.',
                image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=800&q=80'
              },
              {
                icon: <Smartphone size={28} style={{ color: '#0F4C2C' }} />,
                title: '3. QR Code Digital Gate Passes',
                desc: 'Zero-paperwork entry pass system. Every registered athlete gets a verified digital E-Pass with a scannable QR code for instant venue access and barcode check-in at official stadium gates.',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?auto=format&fit=crop&w=800&q=80'
              },
              {
                icon: <BarChart3 size={28} style={{ color: '#0F4C2C' }} />,
                title: '4. Organizer Financial Dashboard',
                desc: 'Transparent pricing plans for organizers — Basic (100 free passes), Pay-Per-Event (0% ticket commission), and Pay-Per-Ticket (zero upfront cost). Includes revenue tracking and payouts.',
                image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80'
              },
              {
                icon: <Award size={28} style={{ color: '#0F4C2C' }} />,
                title: '5. Hall of Champions & Leaderboards',
                desc: 'Verified archiving of championship winners, runner-ups, gold medalists, tournament MVP awards, and official digitized certificates of participation for all competing athletes.',
                image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
              },
              {
                icon: <Lock size={28} style={{ color: '#0F4C2C' }} />,
                title: '6. Verified Player & Organizer Badges',
                desc: 'Bank-grade identity verification ensuring genuine organizers, authentic player rosters, anti-fraud ticketing protection, and 100% secure Razorpay payment gateway integration.',
                image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80'
              }
            ].map((service, idx) => (
              <div key={idx} className="glass-card" style={{
                padding: '32px 28px',
                background: '#051A0E',
                borderRadius: '20px',
                border: '2px solid #76A376',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                boxShadow: '0 10px 30px rgba(28, 51, 28, 0.15)'
              }}>
                {/* Background Sports Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  onError={e => { e.target.onerror = null; e.target.src = service.fallback; }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    transition: 'transform 0.6s ease'
                  }}
                />

                {/* Dark Fern Glass Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(15,41,27,0.7) 0%, rgba(15,41,27,0.94) 100%)',
                  zIndex: 1
                }} />

                {/* Content Details */}
                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: '#FFFFFF',
                    border: '2px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    marginBottom: '4px'
                  }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.35rem', color: '#FFFFFF', lineHeight: 1.3, fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#EAF2EA', fontSize: '0.94rem', lineHeight: 1.6, margin: 0, textShadow: '0 1px 6px rgba(0,0,0,0.8)', fontFamily: 'Poppins, sans-serif' }}>
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. OUR VISION SECTION (FULL WIDTH STANDALONE) */}
        <div className="glass-card" style={{
          padding: '40px 36px',
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '2px solid rgba(118, 163, 118, 0.3)',
          marginBottom: '60px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: '0 10px 30px rgba(28, 51, 28, 0.05)',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: '#FFFDF5',
            border: '2px solid #D4AF37',
            color: '#0F4C2C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 15px rgba(212,175,55,0.2)'
          }}>
            <Eye size={32} />
          </div>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <span className="badge-gold" style={{ marginBottom: '8px' }}>FOUNDATIONAL GUIDANCE</span>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', color: '#0F4C2C', marginBottom: '8px' }}>
              Our Vision
            </h3>
            <p style={{ color: '#4A6053', lineHeight: 1.7, fontSize: '1.02rem', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
              To build India’s most trusted sports network where every grassroot tournament, collegiate championship, and national league is organized with international standards, transparent governance, and digital excellence.
            </p>
          </div>
        </div>

        {/* 5. HOW IT WORKS WORKFLOW CAROUSEL SLIDER (FULL WIDTH STANDALONE) */}
        <div className="glass-card" style={{ padding: '48px 32px', marginBottom: '80px', background: '#FFFFFF', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(28, 51, 28, 0.08)', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge-gold" style={{ marginBottom: '10px' }}>WORKFLOW PIPELINE</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', color: '#0F4C2C' }}>
              How SRV Operates
            </h2>
            <p style={{ color: '#4A6053', fontSize: '0.96rem', marginTop: '6px' }}>
              Click any step below or use the controls to view the smooth 4-step athlete journey.
            </p>
          </div>

          {/* Numbered Step Tabs Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
            {WORKFLOW_STEPS.map((st, i) => (
              <button
                key={i}
                onClick={() => setWorkflowIndex(i)}
                style={{
                  background: i === workflowIndex ? '#0F4C2C' : '#F2F7F2',
                  color: i === workflowIndex ? '#FFFFFF' : '#3D5A3D',
                  border: i === workflowIndex ? '2px solid #D4AF37' : '1.5px solid rgba(118, 163, 118, 0.4)',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontFamily: 'Cinzel, serif',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: i === workflowIndex ? '0 6px 18px rgba(15,76,44,0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ color: i === workflowIndex ? '#F7D358' : '#76A376', fontWeight: 900 }}>{st.step}</span>
                <span>{st.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* 3D Smooth Sliding Cards Stage */}
          <div style={{
            position: 'relative',
            height: '380px',
            width: '100%',
            maxWidth: '960px',
            margin: '0 auto',
            perspective: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrevWorkflow}
              style={{
                position: 'absolute',
                left: '10px',
                zIndex: 30,
                background: '#FFFFFF',
                border: '2px solid #76A376',
                color: '#0F4C2C',
                borderRadius: '50%',
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNextWorkflow}
              style={{
                position: 'absolute',
                right: '10px',
                zIndex: 30,
                background: '#FFFFFF',
                border: '2px solid #76A376',
                color: '#0F4C2C',
                borderRadius: '50%',
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ChevronRight size={28} />
            </button>

            {/* Workflow Step Cards */}
            {WORKFLOW_STEPS.map((stepItem, idx) => {
              const total = WORKFLOW_STEPS.length;
              let offset = (idx - workflowIndex + total) % total;
              if (offset > total / 2) offset -= total;

              let transform = 'translateX(0) scale(1)';
              let opacity = 1;
              let zIndex = 10;
              let filter = 'none';
              let pointerEvents = 'auto';

              if (offset === 0) {
                // Active Center Card
                transform = 'translateX(0) scale(1)';
                opacity = 1;
                zIndex = 20;
                filter = 'none';
                pointerEvents = 'auto';
              } else if (offset === 1 || offset === -3) {
                // Next Peek Card
                transform = 'translateX(65%) scale(0.85) rotateY(-15deg)';
                opacity = 0.55;
                zIndex = 10;
                filter = 'brightness(0.75)';
                pointerEvents = 'pointer';
              } else if (offset === -1 || offset === 3) {
                // Previous Peek Card
                transform = 'translateX(-65%) scale(0.85) rotateY(15deg)';
                opacity = 0.55;
                zIndex = 10;
                filter = 'brightness(0.75)';
                pointerEvents = 'pointer';
              } else {
                // Hidden Back Card
                transform = offset > 0 ? 'translateX(120%) scale(0.6)' : 'translateX(-120%) scale(0.6)';
                opacity = 0;
                zIndex = 1;
                pointerEvents = 'none';
              }

              const IconComponent = stepItem.icon;

              return (
                <div
                  key={idx}
                  onClick={() => setWorkflowIndex(idx)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    width: '90%',
                    maxWidth: '540px',
                    marginLeft: '-270px',
                    height: '320px',
                    transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                    transform,
                    opacity,
                    zIndex,
                    filter,
                    borderRadius: '24px',
                    border: '2.5px solid #D4AF37',
                    cursor: offset === 0 ? 'default' : 'pointer',
                    pointerEvents,
                    overflow: 'hidden',
                    background: '#051A0E',
                    boxShadow: '0 20px 45px rgba(28, 51, 28, 0.25)'
                  }}
                >
                  {/* Step Background Image */}
                  <img
                    src={stepItem.image}
                    alt={stepItem.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: 0
                    }}
                  />

                  {/* Dark Fern Glass Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15,41,27,0.65) 0%, rgba(15,41,27,0.92) 100%)',
                    zIndex: 1
                  }} />

                  {/* Content Inside Card */}
                  <div style={{
                    position: 'relative',
                    zIndex: 10,
                    height: '100%',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    color: '#FFFFFF'
                  }}>
                    {/* Top Tag & Number Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge-gold" style={{ background: '#FFFFFF', color: '#0F4C2C', fontSize: '0.75rem', fontWeight: 800 }}>
                        {stepItem.tag}
                      </span>
                      <div style={{
                        fontFamily: 'Cinzel, serif',
                        fontSize: '2.8rem',
                        fontWeight: 900,
                        color: '#F7D358',
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                        lineHeight: 1
                      }}>
                        {stepItem.step}
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', border: '1px solid #F7D358', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backdropFilter: 'blur(4px)' }}>
                          <IconComponent size={22} style={{ color: '#F7D358' }} />
                        </div>
                        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#FFFFFF', fontWeight: 800, margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                          {stepItem.title}
                        </h3>
                      </div>
                      <p style={{ color: '#EAF2EA', fontSize: '0.98rem', lineHeight: 1.6, margin: 0, textShadow: '0 1px 6px rgba(0,0,0,0.8)', fontFamily: 'Poppins, sans-serif' }}>
                        {stepItem.desc}
                      </p>
                    </div>

                    {/* Step Progress Line */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flexGrow: 1, height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${((idx + 1) / total) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #F7D358, #D4AF37)', borderRadius: '999px' }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#F7D358', fontWeight: 700 }}>Step {idx + 1} of {total}</span>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* Dots Indicator & Auto-Play Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginTop: '28px' }}>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {WORKFLOW_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setWorkflowIndex(idx)}
                  style={{
                    width: idx === workflowIndex ? '36px' : '10px',
                    height: '10px',
                    borderRadius: '999px',
                    background: idx === workflowIndex ? 'linear-gradient(135deg, #76A376, #0F4C2C)' : 'rgba(118, 163, 118, 0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setIsWorkflowAutoPlaying(!isWorkflowAutoPlaying)}
              style={{
                background: 'none',
                border: 'none',
                color: '#76A376',
                fontSize: '0.9rem',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isWorkflowAutoPlaying ? <Pause size={16} /> : <PlayCircle size={16} />}
              {isWorkflowAutoPlaying ? 'Pause Workflow Slide Animation' : 'Resume Slide Animation'}
            </button>

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
          background: 'linear-gradient(135deg, #0F4C2C 0%, #1C331C 100%)',
          borderRadius: '24px',
          padding: '48px 32px',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 20px 45px rgba(15, 76, 44, 0.3)',
          border: '1.5px solid #D4AF37'
        }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
            color: '#FFFFFF',
            fontWeight: 900,
            marginBottom: '16px',
            textShadow: '0 3px 12px rgba(0,0,0,0.6)'
          }}>
            Ready to Host Your Next Tournament on SRV?
          </h2>
          <p style={{
            fontSize: '1.08rem',
            color: '#EAF2EA',
            maxWidth: '680px',
            margin: '0 auto 32px',
            lineHeight: 1.65,
            fontFamily: 'Poppins, sans-serif',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)'
          }}>
            Join over 500+ organizers across India. Publish your sports event in under 5 minutes and leverage our 0% commission payment system and instant QR ticket check-ins.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('pricing')}
              className="btn btn-gold"
              style={{
                padding: '16px 36px',
                fontSize: '1rem',
                fontWeight: 900,
                borderRadius: '999px',
                boxShadow: '0 8px 25px rgba(212,175,55,0.4)'
              }}
            >
              View Organizer Pricing Tiers
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              style={{
                background: '#FFFFFF',
                color: '#0F4C2C',
                border: '2px solid #FFFFFF',
                borderRadius: '999px',
                padding: '16px 36px',
                fontSize: '1rem',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Poppins', sans-serif",
                letterSpacing: '0.5px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#F7D358';
                e.currentTarget.style.borderColor = '#F7D358';
                e.currentTarget.style.color = '#1C331C';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.color = '#0F4C2C';
              }}
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
