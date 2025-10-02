
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import PastQuestionsView from './components/PastQuestionsView';
import AITutorView from './components/AITutorView';
import DashboardView from './components/DashboardView';
import TutorialVideosView from './components/TutorialVideosView';
import FlashcardsView from './components/FlashcardsView';
import AuthView from './components/AuthView';
import TextbooksView from './components/TextbooksView';
import { View } from './types';
import type { Question } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [questionForTutor, setQuestionForTutor] = useState<Question | null>(null);

  const handleAskTutor = useCallback((question: Question) => {
    setQuestionForTutor(question);
    setCurrentView(View.AI_TUTOR);
  }, []);
  
  const handleLogin = (email?: string, password?: string) => {
    // Check for admin credentials
    if (email === 'markgodwin2008@gmail.com' && password === 'markofGod') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setIsAuthenticated(true);
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <DashboardView />;
      case View.PAST_QUESTIONS:
        return <PastQuestionsView onAskTutor={handleAskTutor} isAdmin={isAdmin} />;
      case View.AI_TUTOR:
        return <AITutorView initialQuestion={questionForTutor} />;
      case View.VIDEOS:
        return <TutorialVideosView />;
      case View.FLASHCARDS:
        return <FlashcardsView />;
      case View.TEXTBOOKS:
        return <TextbooksView />;
      default:
        return <DashboardView />;
    }
  };

  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', backgroundColor: '#f0f4f8' }}>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={handleLogout} />
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
