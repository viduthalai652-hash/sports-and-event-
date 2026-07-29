import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Play } from 'lucide-react';

const VideoModal = ({ videoUrl, title }) => {
  const { closeModal } = useApp();

  if (!videoUrl) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', background: '#000', padding: 0 }}>
        
        {/* Header */}
        <div style={{
          padding: '14px 20px',
          background: 'rgba(10,52,30,0.9)',
          borderBottom: '1px solid #D4AF37',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontFamily: 'Cinzel, serif', color: '#F7D358', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={16} fill="#F7D358" />
            {title || 'SRV Event Video Review'}
          </h3>
          <button onClick={closeModal} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Video Player Frame */}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <video
            src={videoUrl}
            controls
            autoPlay
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default VideoModal;
