
import React, { useState, useEffect } from 'react';
import { FLASHCARDS_DATA } from '../constants';
import { Subject } from '../types';
import type { Flashcard } from '../types';

const FlashcardsView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.MATHEMATICS);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS_DATA[selectedSubject]);

  useEffect(() => {
    setCards(FLASHCARDS_DATA[selectedSubject]);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [selectedSubject]);

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const subjects = Object.values(Subject);
  const currentCard = cards[currentCardIndex];

  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Flashcards</h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginTop: 0, marginBottom: '2.5rem' }}>
        Select a subject to test your memory and reinforce key concepts.
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

      <div style={{ perspective: '1000px', marginBottom: '2rem' }}>
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            width: '100%',
            maxWidth: '600px',
            height: '350px',
            margin: '0 auto',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            cursor: 'pointer',
          }}
        >
          <div style={flashcardBaseStyle}>
            <div style={flashcardContentStyle}>
                <p style={{fontSize: '1.5rem', fontWeight: 600, margin: 0}}>{currentCard?.question}</p>
            </div>
          </div>
          <div style={{ ...flashcardBaseStyle, transform: 'rotateY(180deg)', backgroundColor: '#eef2ff' }}>
            <div style={flashcardContentStyle}>
                <p style={{fontSize: '1.25rem', margin: 0, color: '#4338ca'}}>{currentCard?.answer}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '1rem',
      }}>
        <button onClick={handlePrev} disabled={currentCardIndex === 0} style={navButtonStyle}>
            <ArrowLeftIcon /> Previous
        </button>
        <span style={{fontSize: '1rem', fontWeight: 500, color: '#334155', minWidth: '80px', textAlign: 'center'}}>
            {currentCardIndex + 1} / {cards.length}
        </span>
        <button onClick={handleNext} disabled={currentCardIndex === cards.length - 1} style={navButtonStyle}>
            Next <ArrowRightIcon />
        </button>
      </div>

    </div>
  );
};

const flashcardBaseStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  borderRadius: '0.75rem',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  textAlign: 'center',
  boxSizing: 'border-box',
};

const flashcardContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}

const navButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#fff',
    color: '#334155',
    border: '1px solid #cbd5e1',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    opacity: 1,
};

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);


export default FlashcardsView;
