import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Play, MessageSquarePlus, Award, CheckCircle2, User, X } from 'lucide-react';

const ReviewsView = () => {
  const { reviews, addReview, openVideoModal } = useApp();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Participant',
    eventAttended: 'SRV Sports Event 2026',
    text: '',
    videoUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    addReview(newReview);
    setShowSubmitModal(false);
    setNewReview({ name: '', role: 'Participant', eventAttended: 'SRV Sports Event 2026', text: '', videoUrl: '' });
  };

  return (
    <div style={{ padding: '60px 24px', minHeight: '85vh', background: '#F4F7F4' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px' }}>ATHLETE & ORGANIZER REVIEWS</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.6rem', color: '#0F4C2C' }}>
            Wall of Excellence & Reviews
          </h1>
          <p style={{ color: '#4A6053', fontSize: '0.95rem', maxWidth: '600px', margin: '8px auto 0' }}>
            Verified video testimonials and star ratings from top athletes, runners, and sports managers.
          </p>

          <div style={{ marginTop: '24px' }}>
            <button onClick={() => setShowSubmitModal(true)} className="btn btn-gold" style={{ padding: '12px 28px' }}>
              <MessageSquarePlus size={18} />
              Submit Your Event Review
            </button>
          </div>
        </div>

        {/* Rating Breakdown Bar */}
        <div className="glass-card" style={{ padding: '30px', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '3.5rem', fontWeight: 900, color: '#0F4C2C', lineHeight: 1 }}>
                4.9
              </div>
              <div style={{ display: 'flex', gap: '4px', color: '#D4AF37', justifyContent: 'center', margin: '6px 0' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#D4AF37" />)}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6B7C72' }}>Based on 4,850+ Verified Athletes</div>
            </div>

            <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { stars: '5 Star', pct: '92%' },
                { stars: '4 Star', pct: '7%' },
                { stars: '3 Star', pct: '1%' }
              ].map(r => (
                <div key={r.stars} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.82rem', color: '#0F291B' }}>
                  <span style={{ width: '50px' }}>{r.stars}</span>
                  <div style={{ flex: 1, height: '8px', background: '#E5E7EB', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: r.pct, background: '#D4AF37', borderRadius: '999px' }} />
                  </div>
                  <span style={{ width: '40px', textAlign: 'right', fontWeight: 600 }}>{r.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {reviews.map(rev => (
            <div key={rev.id} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <img
                  src={rev.photo}
                  alt={rev.name}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #D4AF37', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ color: '#0F4C2C', fontSize: '1.05rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    {rev.name}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#146B3A' }}>{rev.role} • {rev.eventAttended}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '4px', color: '#D4AF37', marginBottom: '14px' }}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#D4AF37" />
                ))}
              </div>

              <p style={{ color: '#4A6053', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px', flexGrow: 1, fontStyle: 'italic' }}>
                "{rev.text}"
              </p>

              {rev.videoUrl && (
                <button
                  onClick={() => openVideoModal(rev.videoUrl, `${rev.name} Testimonial`)}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
                >
                  <Play size={16} fill="#0F4C2C" />
                  Watch Video Testimonial
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit Review Modal */}
        {showSubmitModal && (
          <div className="modal-overlay" onClick={() => setShowSubmitModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', padding: '30px', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.3rem' }}>
                  Submit Event Feedback
                </h3>
                <button onClick={() => setShowSubmitModal(false)} style={{ background: 'none', border: 'none', color: '#0F4C2C', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Anish Kumar"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Role / Event Attended *</label>
                  <input
                    type="text"
                    required
                    value={newReview.eventAttended}
                    onChange={e => setNewReview({ ...newReview, eventAttended: e.target.value })}
                    placeholder="e.g. SRV Marathon 2026 Runner"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Your Feedback & Experience *</label>
                  <textarea
                    required
                    rows="4"
                    value={newReview.text}
                    onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                    placeholder="Share your tournament experience..."
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ padding: '12px' }}>
                  Publish Review
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ReviewsView;
