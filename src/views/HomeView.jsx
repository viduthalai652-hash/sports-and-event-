import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import CanvasParticles from '../components/CanvasParticles';
import EventCard from '../components/EventCard';
import { SPORTS_CATEGORIES, SPONSORS } from '../data/mockData';
import { Play, ArrowRight, ShieldCheck, Zap, Award, CheckCircle2, Trophy, Users, Globe, Flame, Star, Calendar, ChevronLeft, ChevronRight, Pause, PlayCircle } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80';

const HomeView = () => {
  const { events, reviews, winners, navigateTo, openVideoModal } = useApp();
  const [counterStats, setCounterStats] = useState({ events: 0, participants: 0, winners: 0, cities: 0 });

  // 3D Stacked Deck Carousel State
  const [stackedIndex, setStackedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredEvents = events.slice(0, 6);

  // 3D Coverflow Deck Carousel State for Curated Tournaments
  const [curatedDeckIndex, setCuratedDeckIndex] = useState(0);
  const [isCuratedAutoPlaying, setIsCuratedAutoPlaying] = useState(true);

  // Auto-slide stacked deck interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setStackedIndex(prev => (prev + 1) % SPORTS_CATEGORIES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Auto-slide curated deck interval
  useEffect(() => {
    if (!isCuratedAutoPlaying || featuredEvents.length === 0) return;
    const interval = setInterval(() => {
      setCuratedDeckIndex(prev => (prev + 1) % featuredEvents.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isCuratedAutoPlaying, featuredEvents.length]);

  const handleNextCurated = () => {
    setCuratedDeckIndex(prev => (prev + 1) % featuredEvents.length);
  };

  const handlePrevCurated = () => {
    setCuratedDeckIndex(prev => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounterStats({
        events: Math.min(150, Math.floor((150 / steps) * step)),
        participants: Math.min(25000, Math.floor((25000 / steps) * step)),
        winners: Math.min(3200, Math.floor((3200 / steps) * step)),
        cities: Math.min(48, Math.floor((48 / steps) * step))
      });

      if (step >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleNextStack = () => {
    setStackedIndex(prev => (prev + 1) % SPORTS_CATEGORIES.length);
  };

  const handlePrevStack = () => {
    setStackedIndex(prev => (prev - 1 + SPORTS_CATEGORIES.length) % SPORTS_CATEGORIES.length);
  };

  // Stacked cards array computation
  const totalCats = SPORTS_CATEGORIES.length;
  const activeCard = SPORTS_CATEGORIES[stackedIndex % totalCats];
  const peekCard1 = SPORTS_CATEGORIES[(stackedIndex + 1) % totalCats];
  const peekCard2 = SPORTS_CATEGORIES[(stackedIndex + 2) % totalCats];

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION WITH FULL-BLEED BACKGROUND VIDEO */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#051A0E',
        padding: '100px 24px 80px',
        overflow: 'hidden'
      }}>
        {/* Full-bleed Ambient Background Video (istockphoto-1752101103-640_adpp_is.mp4) with High Opacity */}
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.85
          }}
        />

        {/* Dark Mint Glass Gradient Overlay for High Text Contrast & Video Clarity */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15,41,27,0.65) 0%, rgba(15,41,27,0.45) 50%, rgba(15,41,27,0.85) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
          
          {/* Centered Hero Text Container */}
          <div style={{ maxWidth: '820px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="badge-gold animate-pulse-gold" style={{
              marginBottom: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              color: '#0F4C2C',
              padding: '8px 24px',
              fontSize: '0.85rem',
              fontWeight: 800,
              border: '2px solid #D4AF37',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              borderRadius: '999px'
            }}>
              <Trophy size={16} style={{ color: '#B88E14' }} />
              <span>INDIA'S PREMIER SPORTS EVENT PLATFORM</span>
            </div>

            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '20px',
              color: '#FFFFFF',
              textShadow: '0 4px 20px rgba(0,0,0,0.85), 0 0 30px rgba(118,163,118,0.5)'
            }}>
              Where Champions <br />
              <span style={{ color: '#F7D358', textShadow: '0 2px 14px rgba(247,211,88,0.5), 0 4px 20px rgba(0,0,0,0.9)' }}>Begin Their Journey</span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: '#EAF2EA',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '680px',
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 2px 10px rgba(0,0,0,0.9)'
            }}>
              Discover, host, and compete in national marathons, T20 cricket leagues, football cups, and state athletic championships with real-time registrations and verified digital passes.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <button
                onClick={() => navigateTo('events')}
                className="btn btn-gold"
                style={{
                  padding: '16px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  borderRadius: '999px',
                  boxShadow: '0 8px 25px rgba(212,175,55,0.5)'
                }}
              >
                Explore Events
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigateTo('about')}
                className="btn btn-outline-white"
                style={{
                  padding: '16px 36px',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  borderRadius: '999px',
                  border: '2px solid #FFFFFF',
                  color: '#FFFFFF',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                About Platform
              </button>
            </div>

            {/* Quick Trust Badges Centered */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', fontSize: '0.92rem', color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15,41,27,0.5)', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(118,163,118,0.4)', backdropFilter: 'blur(4px)' }}>
                <ShieldCheck size={18} style={{ color: '#76A376' }} />
                <span>100% Verified Organizers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15,41,27,0.5)', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(212,175,55,0.4)', backdropFilter: 'blur(4px)' }}>
                <Zap size={18} style={{ color: '#F7D358' }} />
                <span>Instant Pass Issue</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. AUTO-SCROLLING SPONSORS TICKER */}
      <section style={{
        background: '#FFFFFF',
        borderTop: '1.5px solid #76A376',
        borderBottom: '1.5px solid #76A376',
        padding: '20px 0',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '30px' }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.8rem', color: '#76A376', fontWeight: 800, letterSpacing: '1px', flexShrink: 0 }}>
            OFFICIAL BRAND PARTNERS
          </span>
          <div style={{ display: 'flex', gap: '50px', width: '100%', overflowX: 'auto', paddingBottom: '4px' }}>
            {SPONSORS.map((sp, idx) => (
              <div key={idx} style={{
                color: '#997A15',
                fontFamily: 'Cinzel, serif',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '2px',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}>
                {sp.logoText}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SPORTS CATEGORIES SECTION WITH ULTRA LARGE 3D STACKED CARD DECK */}
      <section style={{ padding: '60px 24px 20px 24px', background: '#F2F7F2' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          
          <span className="badge-gold" style={{ marginBottom: '12px' }}>DISCOVER YOUR SPORT</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '3rem', color: '#1C331C', marginBottom: '12px' }}>
            Explore Sports Categories
          </h2>
          <p style={{ color: '#3D5A3D', maxWidth: '720px', margin: '0 auto 36px', fontSize: '1.1rem' }}>
            Interactive 3D Stacked Deck Carousel with high definition sport photos, live tournament counts, and instant filter triggers.
          </p>

          {/* Quick Sport Selector Pills */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '36px'
          }}>
            {SPORTS_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => setStackedIndex(idx)}
                style={{
                  background: (stackedIndex % totalCats) === idx ? '#76A376' : '#FFFFFF',
                  color: (stackedIndex % totalCats) === idx ? '#FFFFFF' : '#1C331C',
                  border: (stackedIndex % totalCats) === idx ? 'none' : '1.5px solid #76A376',
                  padding: '8px 20px',
                  borderRadius: '999px',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: (stackedIndex % totalCats) === idx ? '0 4px 14px rgba(118,163,118,0.45)' : 'none'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* ULTRA LARGE 3D STACKED CARD DECK CONTAINER */}
          <div style={{
            position: 'relative',
            maxWidth: '920px',
            margin: '0 auto 10px',
            minHeight: '540px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px'
          }}>
            
            {/* Nav Arrows Controls */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '-90px',
              right: '-90px',
              transform: 'translateY(-50%)',
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 30,
              pointerEvents: 'none'
            }}>
              <button
                onClick={handlePrevStack}
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '2.5px solid #76A376',
                  color: '#1C331C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.18)',
                  pointerEvents: 'auto',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronLeft size={30} />
              </button>

              <button
                onClick={handleNextStack}
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '2.5px solid #76A376',
                  color: '#1C331C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.18)',
                  pointerEvents: 'auto',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronRight size={30} />
              </button>
            </div>

            {/* STACK LAYER 3: Peeking Card 2 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '480px',
                borderRadius: '36px',
                background: '#FFFFFF',
                border: '2.5px solid #D4AF37',
                transform: 'translateY(64px) scale(0.88)',
                opacity: 0.75,
                zIndex: 1,
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.22)',
                transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'
              }}
            >
              <img
                src={peekCard2.image}
                alt={peekCard2.name}
                onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(28,51,28,0.85) 100%)' }} />
            </div>

            {/* STACK LAYER 2: Peeking Card 1 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '480px',
                borderRadius: '36px',
                background: '#FFFFFF',
                border: '2.5px solid #76A376',
                transform: 'translateY(32px) scale(0.94)',
                opacity: 0.92,
                zIndex: 2,
                overflow: 'hidden',
                boxShadow: '0 18px 40px rgba(0,0,0,0.28)',
                transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'
              }}
            >
              <img
                src={peekCard1.image}
                alt={peekCard1.name}
                onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(28,51,28,0.88) 100%)' }} />
            </div>

            {/* STACK LAYER 1: Active Front Card (HERO PROMINENT SIZE) */}
            <div
              onClick={() => navigateTo('events', activeCard.name)}
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '480px',
                borderRadius: '36px',
                background: '#FFFFFF',
                border: '3.5px solid #76A376',
                transform: 'translateY(0px) scale(1)',
                zIndex: 10,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 30px 65px rgba(28,51,28,0.3), 0 0 40px rgba(118,163,118,0.4)',
                transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '36px'
              }}
            >
              {/* 100% VISIBLE CRISP BACKGROUND IMAGE */}
              <img
                src={activeCard.image}
                alt={activeCard.name}
                onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  opacity: 1,
                  transition: 'transform 0.6s ease'
                }}
              />

              {/* Gradient overlay for text contrast at bottom only */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 30%, rgba(15,41,27,0.92) 100%)',
                zIndex: 1
              }} />

              {/* Card Header Content */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '3px solid #76A376',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#76A376',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.35)'
                }}>
                  <Trophy size={36} />
                </div>

                <div style={{
                  background: '#FFFFFF',
                  color: '#1C331C',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: '2px solid #76A376',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  {activeCard.count} Active Tournaments
                </div>
              </div>

              {/* Card Middle & Footer Content */}
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
                <h3 style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '2.8rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  textShadow: '0 3px 12px rgba(0,0,0,0.9)',
                  marginBottom: '6px',
                  lineHeight: 1.1
                }}>
                  {activeCard.name}
                </h3>

                <p style={{
                  color: '#F7D358',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '24px',
                  textShadow: '0 2px 6px rgba(0,0,0,0.9)'
                }}>
                  {activeCard.subtitle}
                </p>

                {/* Tag Pills */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {activeCard.tags && activeCard.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.28)',
                        backdropFilter: 'blur(12px)',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        padding: '8px 20px',
                        borderRadius: '999px',
                        border: '1.5px solid rgba(255, 255, 255, 0.6)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Auto-play toggle button */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              style={{
                background: 'none',
                border: 'none',
                color: '#76A376',
                fontSize: '0.95rem',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isAutoPlaying ? <Pause size={18} /> : <PlayCircle size={18} />}
              {isAutoPlaying ? 'Pause 3D Deck Auto-Slide' : 'Resume Auto-Slide'}
            </button>
          </div>

        </div>
      </section>

      {/* 4. FEATURED EVENTS 3D COVERFLOW DECK CAROUSEL */}
      <section style={{ padding: '60px 24px 90px 24px', background: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="badge-gold" style={{ marginBottom: '8px' }}>CURATED TOURNAMENTS</span>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', color: '#1C331C' }}>
                Featured Competitions
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => navigateTo('events')}
                className="btn btn-outline-gold"
                style={{ padding: '10px 24px', fontSize: '0.85rem' }}
              >
                View All Events ({events.length})
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* 3D Stacked Coverflow Stage */}
          <div style={{
            position: 'relative',
            height: '520px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            perspective: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            {/* Left Nav Arrow Button */}
            <button
              onClick={handlePrevCurated}
              style={{
                position: 'absolute',
                left: '12px',
                zIndex: 30,
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid #76A376',
                color: '#1C331C',
                borderRadius: '50%',
                width: '54px',
                height: '54px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(118, 163, 118, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = '#76A376';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = '#1C331C';
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Nav Arrow Button */}
            <button
              onClick={handleNextCurated}
              style={{
                position: 'absolute',
                right: '12px',
                zIndex: 30,
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid #76A376',
                color: '#1C331C',
                borderRadius: '50%',
                width: '54px',
                height: '54px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(118, 163, 118, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = '#76A376';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = '#1C331C';
              }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Render 3D Layered Cards */}
            {featuredEvents.map((event, idx) => {
              const total = featuredEvents.length;
              let offset = (idx - curatedDeckIndex + total) % total;
              if (offset > total / 2) offset -= total;

              let transform = 'translateX(0%) scale(1)';
              let opacity = 1;
              let zIndex = 10;
              let filter = 'none';
              let boxShadow = '0 20px 50px rgba(118, 163, 118, 0.35)';
              let border = '2px solid #76A376';
              let pointerEvents = 'auto';

              if (offset === 0) {
                // Front Center Active Card
                transform = 'translateX(0%) scale(1.05)';
                opacity = 1;
                zIndex = 25;
                boxShadow = '0 25px 65px rgba(118, 163, 118, 0.55), 0 0 35px rgba(118, 163, 118, 0.65)';
                border = '3px solid #76A376';
              } else if (offset === 1) {
                // Immediate Right Card
                transform = 'translateX(60%) scale(0.85) rotateY(-12deg)';
                opacity = 0.82;
                zIndex = 15;
                filter = 'brightness(0.92)';
              } else if (offset === -1 || offset === total - 1) {
                // Immediate Left Card
                transform = 'translateX(-60%) scale(0.85) rotateY(12deg)';
                opacity = 0.82;
                zIndex = 15;
                filter = 'brightness(0.92)';
              } else if (offset === 2) {
                // Far Right Card
                transform = 'translateX(105%) scale(0.68) rotateY(-20deg)';
                opacity = 0.45;
                zIndex = 8;
                filter = 'brightness(0.75)';
              } else if (offset === -2 || offset === total - 2) {
                // Far Left Card
                transform = 'translateX(-105%) scale(0.68) rotateY(20deg)';
                opacity = 0.45;
                zIndex = 8;
                filter = 'brightness(0.75)';
              } else {
                // Hidden Cards
                transform = offset > 0 ? 'translateX(140%) scale(0.5)' : 'translateX(-140%) scale(0.5)';
                opacity = 0;
                zIndex = 1;
                pointerEvents = 'none';
              }

              return (
                <div
                  key={event.id}
                  onClick={() => setCuratedDeckIndex(idx)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    width: '90%',
                    maxWidth: '440px',
                    marginLeft: '-220px',
                    transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                    transform,
                    opacity,
                    zIndex,
                    filter,
                    boxShadow,
                    borderRadius: '24px',
                    border,
                    cursor: offset === 0 ? 'default' : 'pointer',
                    pointerEvents,
                    overflow: 'hidden'
                  }}
                >
                  <EventCard event={event} />
                </div>
              );
            })}

          </div>

          {/* Dots Indicator & Auto-Play Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
            
            {/* Pagination Dots */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {featuredEvents.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCuratedDeckIndex(idx)}
                  style={{
                    width: idx === curatedDeckIndex ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '999px',
                    background: idx === curatedDeckIndex ? 'linear-gradient(135deg, #76A376, #3A603A)' : 'rgba(118, 163, 118, 0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {/* Auto-Slide Pause / Play */}
            <button
              onClick={() => setIsCuratedAutoPlaying(!isCuratedAutoPlaying)}
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
              {isCuratedAutoPlaying ? <Pause size={16} /> : <PlayCircle size={16} />}
              {isCuratedAutoPlaying ? 'Pause 3D Deck Movement' : 'Resume 3D Movement'}
            </button>

          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE SRV SECTION */}
      <section style={{ padding: '80px 24px', background: '#F2F7F2' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge-gold" style={{ marginBottom: '12px' }}>THE SRV ADVANTAGE</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', color: '#1C331C', marginBottom: '48px' }}>
            Why Organizers & Athletes Trust SRV
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {[
              {
                title: 'Trusted Organizers',
                desc: '100% verified sports federations, academies, and tournament hosts.',
                icon: ShieldCheck,
                image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Easy Online Registration',
                desc: 'Seamless 3-step registration with digital bib issuing and QR receipts.',
                icon: Zap,
                image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Instant Confirmation',
                desc: 'Receive real-time SMS & email tickets right after payment.',
                icon: CheckCircle2,
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Secure Payments',
                desc: 'Encrypted payment gateways with zero hidden processing charges.',
                icon: Award,
                image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Real-time Notifications',
                desc: 'Instant alerts for schedule changes, bib pickups, and winner announcements.',
                icon: Calendar,
                image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80'
              },
              {
                title: 'Professional Management',
                desc: 'Complete admin suite with player rosters, CSV exports, and analytics.',
                icon: Globe,
                image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80',
                fallback: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card animate-wave-card"
                  style={{
                    padding: '32px 24px',
                    textAlign: 'left',
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    border: '2px solid #76A376',
                    animationDelay: `${idx * 0.2}s`
                  }}
                >
                  {/* Crisp Background Sports Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={e => { e.target.onerror = null; e.target.src = item.fallback; }}
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

                  {/* Dark Vignette Overlay for Text Readability */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(15,41,27,0.92) 100%)',
                    zIndex: 1
                  }} />

                  {/* Content Overlay */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: '2.5px solid #76A376',
                      color: '#76A376',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.35)'
                    }}>
                      <Icon size={26} />
                    </div>

                    <h3 style={{
                      fontFamily: 'Cinzel, serif',
                      color: '#FFFFFF',
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      marginBottom: '8px',
                      textShadow: '0 2px 8px rgba(0,0,0,0.9)'
                    }}>
                      {item.title}
                    </h3>

                    <p style={{
                      color: '#F2F7F2',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                      fontFamily: 'Poppins, sans-serif'
                    }}>
                      {item.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ANIMATED STATISTICS COUNTER */}
      <section style={{
        background: 'linear-gradient(135deg, #76A376 0%, #3A603A 100%)',
        borderTop: '1.5px solid #D4AF37',
        borderBottom: '1.5px solid #D4AF37',
        padding: '60px 24px',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2.8rem', fontWeight: 900, color: '#F7D358', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                {counterStats.events}+
              </div>
              <div style={{ fontSize: '0.9rem', color: '#EAF2EA', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                Events Hosted
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2.8rem', fontWeight: 900, color: '#F7D358', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                {counterStats.participants.toLocaleString()}+
              </div>
              <div style={{ fontSize: '0.9rem', color: '#EAF2EA', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                Participants Registered
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2.8rem', fontWeight: 900, color: '#F7D358', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                {counterStats.winners.toLocaleString()}+
              </div>
              <div style={{ fontSize: '0.9rem', color: '#EAF2EA', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                Winners Recognized
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2.8rem', fontWeight: 900, color: '#F7D358', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                {counterStats.cities}+
              </div>
              <div style={{ fontSize: '0.9rem', color: '#EAF2EA', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                Cities Covered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER (FULL-BLEED END-TO-END WITH HIGH-DEFINITION SPORTS BACKGROUND IMAGE) */}
      <section style={{
        position: 'relative',
        padding: '100px 24px',
        width: '100%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden'
      }}>
        {/* Dark Fern Gradient Overlay for Text Contrast */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(15,76,44,0.92) 0%, rgba(28,51,28,0.95) 100%)',
          zIndex: 1
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'center',
          color: '#FFFFFF'
        }}>
          <div className="badge-gold animate-pulse-gold" style={{ marginBottom: '20px', display: 'inline-flex', padding: '8px 24px', fontSize: '0.9rem', background: '#FFFFFF', color: '#0F4C2C', fontWeight: 800, borderRadius: '999px' }}>
            <Trophy size={16} style={{ color: '#B88E14' }} />
            JOIN INDIA'S #1 SPORTS PLATFORM TODAY
          </div>

          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2.4rem, 5.5vw, 3.6rem)',
            color: '#FFFFFF',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '20px',
            textShadow: '0 4px 20px rgba(0,0,0,0.6)'
          }}>
            Ready to Claim Your <span style={{ color: '#F7D358', textShadow: '0 2px 12px rgba(247,211,88,0.4)' }}>Winning Edge?</span>
          </h2>

          <p style={{
            color: '#EAF2EA',
            fontSize: '1.15rem',
            maxWidth: '750px',
            margin: '0 auto 36px',
            lineHeight: 1.7,
            fontFamily: 'Poppins, sans-serif'
          }}>
            Join over 120,000 athletes, 500+ tournament organizers, and sports academies across India. Experience 100% digital registration, instant QR e-passes, and live championship leaderboards today.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('events')}
              className="btn btn-gold"
              style={{
                padding: '16px 40px',
                fontSize: '1.1rem',
                fontWeight: 900,
                borderRadius: '999px',
                boxShadow: '0 10px 30px rgba(212,175,55,0.45)'
              }}
            >
              Register For An Event
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigateTo('pricing')}
              className="btn btn-outline-white"
              style={{
                padding: '16px 36px',
                fontSize: '1.1rem',
                fontWeight: 800,
                borderRadius: '999px',
                border: '2px solid #FFFFFF',
                color: '#FFFFFF',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)'
              }}
            >
              Host A Tournament
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeView;
