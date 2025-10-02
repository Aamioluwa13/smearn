
import React, { useState } from 'react';
import { TUTORIAL_VIDEOS_DATA } from '../constants';
import type { TutorialVideo } from '../types';
import { Subject } from '../types';

const TutorialVideosView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.MATHEMATICS);
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(null);

  const subjects = Object.values(Subject);
  const videos = TUTORIAL_VIDEOS_DATA[selectedSubject];

  if (selectedVideo) {
    return <VideoPlayer video={selectedVideo} onBack={() => setSelectedVideo(null)} />;
  }

  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Curated Tutorial Videos</h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginTop: 0, marginBottom: '2.5rem' }}>
        Select a subject to watch helpful videos from expert tutors.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid',
              borderColor: selectedSubject === subject ? '#4f46e5' : '#cbd5e1',
              backgroundColor: selectedSubject === subject ? '#4f46e5' : '#fff',
              color: selectedSubject === subject ? '#fff' : '#334155',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {subject}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onSelect={() => setSelectedVideo(video)} />
        ))}
      </div>
    </div>
  );
};

const VideoCard: React.FC<{ video: TutorialVideo, onSelect: () => void }> = ({ video, onSelect }) => {
    const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
    return (
        <div 
            onClick={onSelect}
            style={{
                backgroundColor: '#fff',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            }}
            onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
            }}
            onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
            }}
        >
            <img src={thumbnailUrl} alt={video.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.4' }}>{video.title}</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5' }}>{video.description}</p>
            </div>
        </div>
    )
};

const VideoPlayer: React.FC<{ video: TutorialVideo, onBack: () => void }> = ({ video, onBack }) => {
    const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
    return (
        <div>
            <button
                onClick={onBack}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#fff',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease-in-out'
                }}
            >
                <ArrowLeftIcon />
                Back to Videos
            </button>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}>
                <iframe
                    src={embedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
            </div>
            <div style={{marginTop: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem'}}>
                <h2 style={{marginTop: 0, fontSize: '1.5rem', fontWeight: 700}}>{video.title}</h2>
                <p style={{marginTop: 0, color: '#64748b'}}>{video.description}</p>
            </div>
        </div>
    );
};

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
)

export default TutorialVideosView;
