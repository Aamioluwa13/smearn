import React, { useState } from 'react';
import { TEXTBOOKS_DATA } from '../constants';
import { Subject } from '../types';
import type { Textbook } from '../types';

const TextbookReader: React.FC<{ textbook: Textbook, onBack: () => void }> = ({ textbook, onBack }) => {
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
                Back to Textbooks
            </button>
            <div style={{ backgroundColor: '#fff', borderRadius: '0.75rem', padding: '2rem', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <img src={textbook.coverUrl} alt={textbook.title} style={{ width: '200px', height: '280px', objectFit: 'cover', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} />
                    <div style={{flex: 1, minWidth: '300px'}}>
                        <h2 style={{ marginTop: 0, fontSize: '1.75rem', fontWeight: 700 }}>{textbook.title}</h2>
                        <p style={{ marginTop: 0, color: '#64748b' }}>{textbook.description}</p>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#eef2ff',
                            color: '#4338ca',
                            borderRadius: '9999px',
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}>{textbook.subject}</span>
                    </div>
                </div>
                <hr style={{border: 'none', borderTop: '1px solid #e2e8f0', margin: '2rem 0'}} />
                <div>
                    <h3 style={{fontSize: '1.25rem'}}>Textbook Content</h3>
                    <div style={{color: '#64748b', lineHeight: '1.7'}}>
                        <p>This is a placeholder for the textbook content. In a real application, this area would be populated with the actual pages from the textbook, perhaps using a PDF viewer or a custom HTML renderer.</p>
                        <p>For now, you can imagine flipping through pages of "{textbook.title}" and studying its contents right here in the app.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TextbooksView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.MATHEMATICS);
  const [readingBook, setReadingBook] = useState<Textbook | null>(null);

  const subjects = Object.values(Subject);
  const textbooks = TEXTBOOKS_DATA[selectedSubject] || [];
  
  if (readingBook) {
    return <TextbookReader textbook={readingBook} onBack={() => setReadingBook(null)} />;
  }

  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>WAEC & JAMB Textbooks</h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginTop: 0, marginBottom: '2.5rem' }}>
        Browse recommended textbooks. Premium books are available for download.
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {textbooks.map((book) => (
          <TextbookCard key={book.id} textbook={book} onRead={() => setReadingBook(book)} />
        ))}
      </div>
    </div>
  );
};

const TextbookCard: React.FC<{ textbook: Textbook, onRead: () => void }> = ({ textbook, onRead }) => {
    
    const handleDownload = () => {
        if (textbook.isPremium) {
            alert('This is a premium textbook. Please upgrade your account to download.');
        } else {
            // In a real app, this would trigger a file download.
            alert(`Downloading "${textbook.title}"...`);
            window.open(textbook.downloadUrl, '_blank');
        }
    }

    return (
        <div 
            style={{
                backgroundColor: '#fff',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={{ position: 'relative' }}>
                <img src={textbook.coverUrl} alt={textbook.title} style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
                {textbook.isPremium && (
                    <span style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        backgroundColor: '#f59e0b',
                        color: '#fff',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <StarIcon />
                        Premium
                    </span>
                )}
            </div>
            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.4' }}>{textbook.title}</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5', flex: 1 }}>{textbook.description}</p>
                <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button onClick={onRead} style={buttonBaseStyle}>Read</button>
                    <button onClick={handleDownload} style={{...buttonBaseStyle, ...downloadButtonStyle}}>
                        Download
                    </button>
                </div>
            </div>
        </div>
    )
};

const buttonBaseStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    color: '#334155',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    textAlign: 'center'
}

const downloadButtonStyle: React.CSSProperties = {
    backgroundColor: '#4f46e5',
    color: '#fff',
    borderColor: '#4f46e5'
}

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
)

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
)

export default TextbooksView;