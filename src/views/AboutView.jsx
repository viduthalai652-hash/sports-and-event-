import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Logo from '../components/Logo';
import ChampionsGalleryLightbox from '../components/ChampionsGalleryLightbox';
import { 
  ShieldCheck, Award, Zap, Users, Globe, Target, Eye, Flame, CheckCircle2, 
  Calendar, Ticket, Trophy, Smartphone, BarChart3, HelpCircle, ArrowRight, 
  Sparkles, Clock, Lock, Cpu, Layers, ChevronLeft, ChevronRight, Pause, PlayCircle, FileText,
  Heart, Star, Share2, ChevronDown, ExternalLink, RefreshCw, MessageSquare, Quote
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

const GALLERY_ITEMS = [
  {
    id: 'g1',
    sport: 'Cricket',
    title: 'SRV All-India T20 Finals 2025',
    location: 'M. Chinnaswamy Stadium, Bengaluru',
    winner: 'Karnataka Lions XI',
    date: 'Dec 2025',
    prize: '₹3,00,000 Cash Prize',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    desc: 'Tense last-ball victory by Karnataka Lions before a cheering crowd of 15,000+ fans.'
  },
  {
    id: 'g2',
    sport: 'Football',
    title: 'Goa Coastal Gold Cup Showdown',
    location: 'Fatorda Stadium Turf, Margao',
    winner: 'FC Coastline Strikers',
    date: 'Nov 2025',
    prize: '₹2,00,000 Cash Prize',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    desc: 'High-octane 7-a-side floodlit tournament featuring 64 top clubs across India.'
  },
  {
    id: 'g3',
    sport: 'Running',
    title: 'National Sea Link Marathon 2025',
    location: 'Bandra Promenade, Mumbai',
    winner: 'Priya Sundaram (21K Women)',
    date: 'Oct 2025',
    prize: '₹1,50,000 Cash Prize',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80',
    desc: 'Over 1,200 runners crossed the finish line receiving gold-embossed medals and timing chips.'
  },
  {
    id: 'g4',
    sport: 'Badminton',
    title: 'Pro Open Badminton Masters',
    location: 'Gachibowli Indoor Arena, Hyderabad',
    winner: 'Ananya Deshmukh',
    date: 'Sep 2025',
    prize: '₹1,00,000 Cash Prize',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    desc: 'Thrilling 3-set singles final played on professional Yonex wooden courts.'
  },
  {
    id: 'g5',
    sport: 'Kabaddi',
    title: 'Pro-Mat Kabaddi Championship',
    location: 'Kanteerava Stadium, Bengaluru',
    winner: 'Deccan Raiders',
    date: 'Aug 2025',
    prize: '₹2,50,000 Cash Prize',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80',
    desc: 'High-energy super raids and tackles captured live on SRV Sports Network.'
  },
  {
    id: 'g6',
    sport: 'Volleyball',
    title: 'Beach Spike Super Cup',
    location: 'Calangute Arena, Goa',
    winner: 'Goa Wave Riders',
    date: 'Jul 2025',
    prize: '₹1,20,000 Cash Prize',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    desc: 'Electrifying 4v4 beach volleyball showdown under sunset coastal skies.'
  }
];

const AboutView = () => {
  const appContext = useApp() || {};
  const navigateTo = appContext.navigateTo || (() => {});
  
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [isWorkflowAutoPlaying, setIsWorkflowAutoPlaying] = useState(true);
  const [expandedService, setExpandedService] = useState(null);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');
  const [activeLightboxIdx, setActiveLightboxIdx] = useState(null);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

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

  const filteredGallery = GALLERY_ITEMS.filter(item => {
    if (selectedGalleryCategory !== 'All' && item.sport !== selectedGalleryCategory) return false;
    return true;
  });

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
            marginBottom: '20px',
            textShadow: '0 0 22px #FFFFFF, 0 0 38px #FFFFFF, 0 3px 14px rgba(255,255,255,1), 0 2px 5px rgba(0,0,0,0.6)'
          }}>
            Empowering Champions & <br />
            <span style={{ color: '#1C331C', textShadow: '0 0 22px #FFFFFF, 0 0 38px #FFFFFF, 0 3px 14px rgba(255,255,255,1), 0 2px 5px rgba(0,0,0,0.6)' }}>Elevating Indian Sports Management</span>
          </h1>

          {/* Hero Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('events')}
              className="btn btn-gold"
              style={{ padding: '14px 32px', fontSize: '0.95rem', borderRadius: '999px', boxShadow: '0 6px 20px rgba(212,175,55,0.4)' }}
            >
              Explore Competitions
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              style={{
                background: '#FFFFFF',
                color: '#0F4C2C',
                border: '2px solid #FFFFFF',
                borderRadius: '999px',
                padding: '14px 32px',
                fontSize: '0.95rem',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
              }}
            >
              Become An Organizer
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* 2. COMPANY STORY & TIMELINE (NEW) */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '40px 32px',
            border: '1.5px solid rgba(118, 163, 118, 0.3)',
            boxShadow: '0 15px 35px rgba(28, 51, 28, 0.05)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Story Content */}
            <div>
              <span className="badge-gold" style={{ marginBottom: '12px' }}>OUR JOURNEY & VISION</span>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', color: '#0F4C2C', marginBottom: '16px', fontWeight: 900 }}>
                Building India's Most Trusted Sports Marketplace
              </h2>
              <p style={{ color: '#3D5A3D', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>
                Founded with a mission to bridge athletes, tournament organizers, and sports academies across India, <strong>SRV – THE WINNING EDGE</strong> simplifies event publishing, ticket checkout, verified leaderboards, and instant scannable QR passes.
              </p>
              
              {/* Founder's Quote Box */}
              <div style={{
                background: '#FFFDF5',
                borderLeft: '4px solid #D4AF37',
                padding: '16px 20px',
                borderRadius: '0 12px 12px 0'
              }}>
                <Quote size={20} style={{ color: '#D4AF37', marginBottom: '6px' }} />
                <p style={{ fontSize: '0.9rem', color: '#1C331C', fontStyle: 'italic', fontWeight: 600 }}>
                  "Our goal is to give every athlete in India a transparent platform to showcase their talent and every organizer the tools to run world-class championships."
                </p>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F4C2C', marginTop: '6px' }}>
                  — Vikramaditya Rao, Founder & Managing Director
                </div>
              </div>
            </div>

            {/* Interactive Timeline Stepper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { year: '2019', title: 'SRV Founded', desc: 'Started in Bengaluru with digital sports registration prototypes.' },
                { year: '2020', title: '100+ Events', desc: 'Pioneered QR code stadium check-in passes.' },
                { year: '2022', title: 'Nationwide Reach', desc: 'Expanded across 30+ states & Union Territories.' },
                { year: '2024', title: '100,000+ Athletes', desc: 'Crossed 100k verified registered player profiles.' },
                { year: '2026', title: 'India Premier Platform', desc: 'Distributed over ₹2 Crore in championship prizes.' }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #0F4C2C, #1C331C)',
                    color: '#F7D358',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    flexShrink: 0,
                    fontFamily: 'Cinzel, serif'
                  }}>
                    {step.year}
                  </div>
                  <div>
                    <h4 style={{ color: '#0F4C2C', fontSize: '1rem', fontWeight: 800 }}>{step.title}</h4>
                    <p style={{ color: '#5E7A5E', fontSize: '0.85rem', marginTop: '2px' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. PLATFORM IMPACT STATS (PRESERVED & ENHANCED) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '70px'
        }}>
          {[
            { metric: '500+', label: 'Tournaments Hosted', sub: 'National, State & District Level', icon: Trophy },
            { metric: '120,000+', label: 'Registered Athletes', sub: 'Verified Player Profiles', icon: Users },
            { metric: '50+', label: 'Sports Categories', sub: 'Cricket, Football, Marathon & More', icon: Globe },
            { metric: '100%', label: 'Instant Digital Passes', sub: 'Scannable QR Gate Passes', icon: Ticket }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: '28px 24px',
                  textAlign: 'center',
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px solid rgba(118, 163, 118, 0.3)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#FFFDF5',
                  border: '1.5px solid #D4AF37',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#B88E14'
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: '#0F4C2C', fontWeight: 900 }}>
                  {stat.metric}
                </h3>
                <h4 style={{ color: '#1C331C', fontSize: '1rem', marginTop: '4px', fontWeight: 700 }}>
                  {stat.label}
                </h4>
                <p style={{ color: '#5E7A5E', fontSize: '0.82rem', marginTop: '4px' }}>
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* 4. SERVICES OFFERED (PRESERVED & ENHANCED) */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>END-TO-END SPORTS SOLUTIONS</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', color: '#0F4C2C', fontWeight: 900 }}>
              Services & Capabilities
            </h2>
            <p style={{ color: '#4A6053', fontSize: '0.98rem', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
              Empowering sports organizers with automated registrations, live leaderboards, and instant scannable spectator passes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {[
              {
                title: 'Tournament Publishing & Ticketing',
                desc: 'Create custom tournament landing pages, specify age groups, entry fees, and issue instant digital confirmation tickets.',
                bgImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
                details: 'Includes automated SMS/email confirmations, customizable registration forms, refund policy manager, and real-time seat availability widgets.'
              },
              {
                title: 'Scannable QR Gate Passes',
                desc: 'Eliminate stadium queues with instant QR code digital passes sent straight to athletes and fans on registration.',
                bgImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
                details: 'Scanner app integration for venue gate staff, anti-duplication security tokens, offline scanning mode, and VIP access pass tiering.'
              },
              {
                title: 'Real-Time Fixtures & Standings',
                desc: 'Publish knockout trees, round-robin brackets, and live points tables updated instantly match-by-match.',
                bgImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
                details: 'Auto-calculating net run rates, goal differentials, points tables, team squad rosters, and referee score sheet uploads.'
              },
              {
                title: 'Verified Athlete Profiles',
                desc: 'Digital sports identity passports tracking player statistics, tournament history, badges, and verified accomplishments.',
                bgImage: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80',
                details: 'Medical clearance uploads, age verification badges, career stats tracking across 50+ sports, and downloadable digital certificates.'
              },
              {
                title: 'Transparent Organizer Economics',
                desc: '0% commission options, direct bank payout settlements, and detailed financial reports for event hosts.',
                bgImage: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80',
                details: 'GST compliant invoices, automated organizer payout schedules, ticket sales breakdown dashboards, and sponsor revenue tracking.'
              },
              {
                title: 'Livestreaming & Media Integration',
                desc: 'Broadcast your tournament matches live on SRV Sports Network with custom score graphics and sponsor overlays.',
                bgImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
                details: 'HD streaming feeds, real-time score bugs, match commentary links, automated highlights generation, and social media clips.'
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '24px',
                  minHeight: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '28px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={service.bgImage}
                  alt={service.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0
                  }}
                />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(15,76,44,0.3) 0%, rgba(15,76,44,0.92) 100%)',
                  zIndex: 1
                }} />

                <div style={{ position: 'relative', zIndex: 10, color: '#FFFFFF' }}>
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '8px', fontWeight: 800 }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#EAF2EA', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '14px' }}>
                    {service.desc}
                  </p>

                  {expandedService === idx && (
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#1C331C',
                      padding: '14px',
                      borderRadius: '12px',
                      fontSize: '0.82rem',
                      marginBottom: '14px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}>
                      {service.details}
                    </div>
                  )}

                  <button
                    onClick={() => setExpandedService(expandedService === idx ? null : idx)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#F7D358',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{expandedService === idx ? 'Show Less' : 'Read More Capabilities'}</span>
                    <ChevronDown size={14} style={{ transform: expandedService === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. PREMIUM SPORTS ECOSYSTEM DIAGRAM (NEW) */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>UNIFIED SPORTS NETWORK</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', color: '#0F4C2C', fontWeight: 900 }}>
              The SRV Connected Ecosystem
            </h2>
            <p style={{ color: '#4A6053', fontSize: '0.98rem', marginTop: '8px' }}>
              Seamlessly bridging every stakeholder in Indian athletics under one digital umbrella.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #0F4C2C, #1C331C)',
            borderRadius: '24px',
            padding: '36px 24px',
            color: '#FFFFFF',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '16px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(15,76,44,0.25)'
          }}>
            {[
              { role: 'Athletes', sub: 'Verified Profiles', icon: Users },
              { role: 'Organizers', sub: '0% Commission', icon: Trophy },
              { role: 'Coaches', sub: 'Talent Scouting', icon: Award },
              { role: 'Academies', sub: 'Training Hubs', icon: Globe },
              { role: 'Sponsors', sub: 'Brand Visibility', icon: Zap },
              { role: 'Fans', sub: 'Instant E-Passes', icon: Ticket },
              { role: 'Officials', sub: 'Certified Refs', icon: ShieldCheck }
            ].map((node, i) => {
              const NodeIcon = node.icon;
              return (
                <div key={i} style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '20px 12px',
                  border: '1px solid rgba(247, 211, 88, 0.4)'
                }}>
                  <NodeIcon size={24} style={{ color: '#F7D358', margin: '0 auto 8px' }} />
                  <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>{node.role}</div>
                  <div style={{ fontSize: '0.75rem', color: '#EAF2EA', marginTop: '2px' }}>{node.sub}</div>
                </div>
              );
            })}
          </div>
        </div>



        {/* 7. CHAMPIONS GALLERY (NEW SECTION) */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>CHAMPIONS GALLERY</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', color: '#0F4C2C', fontWeight: 900 }}>
              Unforgettable Tournament Moments
            </h2>
            <p style={{ color: '#4A6053', fontSize: '0.98rem', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
              <em>"Celebrating unforgettable moments from tournaments hosted across India."</em>
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '28px' }}>
            {['All', 'Cricket', 'Football', 'Running', 'Badminton', 'Kabaddi', 'Volleyball'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  border: selectedGalleryCategory === cat ? '1.5px solid #D4AF37' : '1px solid rgba(118,163,118,0.3)',
                  background: selectedGalleryCategory === cat ? 'linear-gradient(135deg, #0F4C2C, #1C331C)' : '#FFFFFF',
                  color: selectedGalleryCategory === cat ? '#FFFFFF' : '#1C331C'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Masonry Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIdx(idx)}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '260px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  border: '1.5px solid rgba(118,163,118,0.3)'
                }}
              >
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,76,44,0.85) 100%)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#FFFFFF'
                }}>
                  <span className="badge-gold" style={{ background: '#FFFFFF', color: '#0F4C2C', width: 'fit-content', marginBottom: '6px' }}>
                    <Trophy size={12} />
                    {item.sport}
                  </span>
                  <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 800 }}>
                    {item.title}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#F7D358', marginTop: '2px', fontWeight: 700 }}>
                    Winner: {item.winner} ({item.prize})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 9. LEADERSHIP TEAM SHOWCASE (PRESERVED & ENHANCED) */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px' }}>LEADERSHIP & ADVISORY</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', color: '#0F4C2C', marginBottom: '40px', fontWeight: 900 }}>
            The Team Behind SRV
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Vikramaditya Rao', title: 'Founder & Managing Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
              { name: 'Dr. Ananya Sundaram', title: 'Head of Sports Operations', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
              { name: 'Siddharth Malhotra', title: 'Chief Product Officer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }
            ].map((member, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '28px 20px', textAlign: 'center', background: '#FFFFFF', borderRadius: '20px', border: '1.5px solid rgba(118,163,118,0.3)' }}>
                <img
                  src={member.img}
                  alt={member.name}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #D4AF37', objectFit: 'cover', margin: '0 auto 16px' }}
                />
                <h4 style={{ color: '#0F4C2C', fontSize: '1.1rem', fontFamily: 'Cinzel, serif', fontWeight: 800 }}>
                  {member.name}
                </h4>
                <p style={{ color: '#76A376', fontSize: '0.85rem', marginTop: '4px', fontWeight: 600 }}>{member.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 11. FAQ ACCORDION (NEW SECTION) */}
        <div style={{ marginBottom: '70px', maxWidth: '800px', margin: '0 auto 70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', color: '#0F4C2C', fontWeight: 900 }}>
              Need Help or Have Questions?
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { q: 'How do I register for a tournament on SRV?', a: 'Browse the Events page, click Register Now on your chosen competition, fill in athlete details, and checkout to receive your instant scannable QR digital pass.' },
              { q: 'What are the fees for tournament organizers?', a: 'SRV offers 0% commission options for basic tournament publishing. Premium feature tiers are listed on our Pricing page.' },
              { q: 'How does the digital QR gate pass work?', a: 'Upon successful registration, your QR pass is displayed on-screen and emailed to you. Show it at stadium gate scanners for instant entry.' },
              { q: 'Are prize distributions guaranteed?', a: 'Yes! All cash prizes are backed by verified SRV tournament escrow accounts and disbursed within 48 hours post-finals.' }
            ].map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(118,163,118,0.3)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#0F4C2C',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} style={{ transform: openFaqIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                </button>
                {openFaqIdx === idx && (
                  <div style={{ padding: '0 20px 18px', color: '#4A6053', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 12. ORGANIZER CTA CALLOUT (PRESERVED & ENHANCED) */}
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
                transition: 'all 0.2s ease'
              }}
            >
              Contact Support Team
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Rendering */}
      {activeLightboxIdx !== null && filteredGallery && filteredGallery[activeLightboxIdx] && (
        <ChampionsGalleryLightbox
          item={filteredGallery[activeLightboxIdx]}
          onClose={() => setActiveLightboxIdx(null)}
          onNext={() => setActiveLightboxIdx((prev) => (prev + 1) % (filteredGallery.length || 1))}
          onPrev={() => setActiveLightboxIdx((prev) => (prev - 1 + (filteredGallery.length || 1)) % (filteredGallery.length || 1))}
        />
      )}

    </div>
  );
};

export default AboutView;
