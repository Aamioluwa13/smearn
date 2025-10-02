
import React, { useState, useRef } from 'react';
import { PAST_QUESTIONS_DATA } from '../constants';
import type { Question } from '../types';
import { Subject } from '../types';
import { extractQuestionsFromFile } from '../services/geminiService';

interface PastQuestionsViewProps {
  onAskTutor: (question: Question) => void;
  isAdmin: boolean;
}

const PastQuestionsView: React.FC<PastQuestionsViewProps> = ({ onAskTutor, isAdmin }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(Subject.MATHEMATICS);
  const [questionsData, setQuestionsData] = useState(PAST_QUESTIONS_DATA);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subjects = Object.values(Subject);
  const questions = questionsData[selectedSubject] || [];

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          const newQuestionsRaw = await extractQuestionsFromFile({
            inlineData: { data: base64Data, mimeType: file.type }
          });

          const newQuestions = newQuestionsRaw.map((q, index) => ({
            ...q,
            id: Date.now() + index // Assign a unique ID
          }));

          setQuestionsData(prevData => ({
            ...prevData,
            [selectedSubject]: [...(prevData[selectedSubject] || []), ...newQuestions]
          }));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during processing.';
            setImportError(errorMessage);
        } finally {
            setIsImporting(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setImportError(errorMessage);
      setIsImporting(false);
    }
    // Reset file input value to allow re-uploading the same file
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>JAMB & WAEC Past Questions</h1>
          <p style={{ fontSize: '1.125rem', color: '#64748b', marginTop: 0, marginBottom: '2.5rem' }}>
            Select a subject to practice questions and test your knowledge.
          </p>
        </div>
        {isAdmin && (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isImporting ? 'Importing...' : 'Import Questions'}
            </button>
          </div>
        )}
      </div>
      
      {isImporting && <p style={{color: '#1d4ed8'}}>AI is extracting questions, this might take a moment...</p>}
      {importError && <p style={{color: '#be123c', backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '0.5rem'}}>Error: {importError}</p>}


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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {questions.length > 0 ? (
            questions.map((q, index) => (
              <QuestionCard key={q.id} question={q} index={index} onAskTutor={onAskTutor} />
            ))
        ) : (
            <div style={{textAlign: 'center', padding: '3rem', backgroundColor: '#fff', borderRadius: '0.5rem'}}>
                <p style={{color: '#64748b'}}>No questions found for this subject. {isAdmin ? 'Try importing some!' : ''}</p>
            </div>
        )}
      </div>
    </div>
  );
};

const QuestionCard: React.FC<{ question: Question, index: number, onAskTutor: (question: Question) => void }> = ({ question, index, onAskTutor }) => {
    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}>
            <p style={{ margin: '0 0 1rem 0', fontWeight: 600, color: '#1e293b' }}>
                Question {index + 1}: {question.text}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {question.options.map((option, i) => (
                    <div key={i} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                        {String.fromCharCode(65 + i)}. {option}
                    </div>
                ))}
            </div>
             <p style={{ margin: '1rem 0 0 0', fontWeight: 500, color: '#166534', backgroundColor: '#dcfce7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                Correct Answer: {question.answer}
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                    onClick={() => onAskTutor(question)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#eef2ff',
                        color: '#4338ca',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-in-out'
                    }}>
                    <SparklesIcon />
                    Ask AI Tutor for help
                </button>
            </div>
        </div>
    )
}

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5 12 2z"></path></svg>
);


export default PastQuestionsView;
