import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onLogout: () => void;
}

const Logo = () => (
    <div style={{ padding: '0 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.866 10.5 16 12 16C13.5 16 18 11.866 18 8C18 4.68629 15.3137 2 12 2Z" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 16V20C9 21.1046 9.89543 22 11 22H13C14.1046 22 15 21.1046 15 20V16" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12L10 8L12 6L14 8L12 12Z" fill="#4f46e5"/>
      </svg>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginLeft: '0.75rem', letterSpacing: '-0.05em' }}>Smearn</h1>
    </div>
);

const NavItem: React.FC<{ icon: React.ReactElement; label: string; isActive: boolean; onClick: () => void; isDisabled?: boolean }> = ({ icon, label, isActive, onClick, isDisabled }) => {
    const activeStyle: React.CSSProperties = {
        backgroundColor: '#eef2ff',
        color: '#4338ca',
        fontWeight: 600,
    };
    const baseStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        marginBottom: '0.5rem',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease-in-out',
        color: isDisabled ? '#94a3b8' : '#334155',
        opacity: isDisabled ? 0.6 : 1,
    };

    return (
        <div onClick={isDisabled ? undefined : onClick} style={{ ...baseStyle, ...(isActive && !isDisabled ? activeStyle : {}) }} onMouseOver={e => {
            if (!isActive && !isDisabled) {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f1f5f9';
            }
        }} onMouseOut={e => {
            if (!isActive && !isDisabled) {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
            }
        }}>
            <span style={{ marginRight: '0.75rem' }}>{icon}</span>
            {label} {isDisabled && <span style={{fontSize: '0.7rem', color: '#64748b', marginLeft: 'auto'}}>(Soon)</span>}
        </div>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, onLogout }) => {
  const navItems = [
    { view: View.DASHBOARD, label: 'Dashboard', icon: <HomeIcon /> },
    { view: View.PAST_QUESTIONS, label: 'Past Questions', icon: <BookOpenIcon /> },
    { view: View.AI_TUTOR, label: 'AI Tutor', icon: <SparklesIcon /> },
    { view: View.FLASHCARDS, label: 'Flashcards', icon: <ClipboardListIcon />, disabled: false },
    { view: View.VIDEOS, label: 'Tutorial Videos', icon: <VideoCameraIcon />, disabled: false },
    { view: View.TEXTBOOKS, label: 'Textbooks', icon: <LibraryIcon />, disabled: false },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      padding: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      boxSizing: 'border-box',
    }}>
      <Logo />
      <nav style={{ flex: 1, padding: '0 1rem' }}>
        {navItems.map(item => (
          <NavItem
            key={item.view}
            label={item.label}
            icon={item.icon}
            isActive={currentView === item.view}
            onClick={() => setCurrentView(item.view)}
            isDisabled={item.disabled}
          />
        ))}
      </nav>
       <div style={{ padding: '0 1rem', marginTop: 'auto' }}>
        <button onClick={onLogout} style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          textAlign: 'left',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          color: '#334155',
          transition: 'all 0.2s ease-in-out',
        }}
         onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f1f5f9';
        }} onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
        }}
        >
          <span style={{ marginRight: '0.75rem' }}><LogoutIcon /></span>
          Logout
        </button>
      </div>
    </aside>
  );
};


const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5 12 2z"></path></svg>
);
const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
);
const VideoCameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m23 7-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
);
const LibraryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 6H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"></path><path d="M20 2H8a2 2 0 0 0-2 2v2"></path></svg>
);
const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);


export default Sidebar;