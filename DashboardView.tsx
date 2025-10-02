import React from 'react';

// FIX: Changed icon type from JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const Card: React.FC<{ title: string; description: string; icon: React.ReactElement }> = ({ title, description, icon }) => (
  <div style={{
    backgroundColor: '#fff',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    display: 'flex',
    alignItems: 'flex-start'
  }}>
    <div style={{
      backgroundColor: '#eef2ff',
      color: '#4f46e5',
      borderRadius: '50%',
      padding: '0.75rem',
      marginRight: '1rem',
      display: 'inline-flex'
    }}>
      {icon}
    </div>
    <div>
      <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#1e293b' }}>{title}</h3>
      <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>{description}</p>
    </div>
  </div>
);

const DashboardView: React.FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome back, Student!</h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginTop: 0, marginBottom: '2.5rem' }}>Ready to ace your exams? Let's get started.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card 
          title="Practice Past Questions" 
          description="Test your knowledge with official JAMB & WAEC past questions."
          icon={<BookOpenIcon />} 
        />
        <Card 
          title="Ask the AI Tutor" 
          description="Stuck on a concept? Get instant explanations and help."
          icon={<SparklesIcon />}
        />
        <Card 
          title="Review Flashcards" 
          description="Master key terms and definitions with interactive cards."
          icon={<ClipboardListIcon />}
        />
        <Card 
          title="Watch Tutorials" 
          description="Learn from curated educational videos by subject."
          icon={<VideoCameraIcon />}
        />
      </div>

      <div style={{ marginTop: '3rem', backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
        <h2 style={{marginTop: 0, fontSize: '1.5rem', fontWeight: 600}}>Your Progress</h2>
        <p style={{color: '#64748b'}}>You haven't attempted any quizzes yet. Start practicing to see your progress here!</p>
      </div>
    </div>
  );
};


const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5 12 2z"></path></svg>
);
const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
);
const VideoCameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m23 7-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
);

export default DashboardView;