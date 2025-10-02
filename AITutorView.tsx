
import React, { useState, useEffect, useRef } from 'react';
import { streamChatResponse } from '../services/geminiService';
import type { ChatMessage, Question } from '../types';

interface AITutorViewProps {
  initialQuestion: Question | null;
}

const AITutorView: React.FC<AITutorViewProps> = ({ initialQuestion }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuestion) {
      const prompt = `Please help me understand and solve this question:\n\n**Question:** "${initialQuestion.text}"\n\n**Options:**\n- A: ${initialQuestion.options[0]}\n- B: ${initialQuestion.options[1]}\n- C: ${initialQuestion.options[2]}\n- D: ${initialQuestion.options[3]}`;
      handleSendMessage(prompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    try {
      const stream = await streamChatResponse(textToSend);
      for await (const chunk of stream) {
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.role === 'model') {
            const updatedMessages = [...prev];
            updatedMessages[prev.length - 1] = {
              ...lastMessage,
              content: lastMessage.content + chunk.text,
            };
            return updatedMessages;
          }
          return prev;
        });
      }
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
        setMessages(prev => prev.slice(0, -1)); // Remove the empty model message
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
  }

  return (
    <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center' }}>
                <SparklesIcon />
                <span style={{ marginLeft: '0.5rem' }}>Smearn AI Tutor</span>
            </h1>
            <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>Your personal AI assistant for exam preparation.</p>
        </div>
      <div ref={chatContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        {messages.length === 0 && !isLoading && (
            <div style={{textAlign: 'center', color: '#94a3b8', paddingTop: '20%'}}>
                <p>Ask me anything about your subjects!</p>
            </div>
        )}
        {messages.map((msg, index) => (
          <ChatMessageBubble key={index} message={msg} />
        ))}
        {error && <div style={{ color: 'red', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '0.5rem' }}>Error: {error}</div>}
      </div>
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about any subject..."
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem 3rem 0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'none',
              minHeight: '24px',
              maxHeight: '120px',
              boxSizing: 'border-box',
              lineHeight: '1.5'
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            style={{
              position: 'absolute',
              right: '0.5rem',
              padding: '0.5rem',
              backgroundColor: isLoading || !input.trim() ? '#e2e8f0' : '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};


const TypingIndicator = () => (
    <div style={{ display: 'inline-block', width: '2px', height: '1em', backgroundColor: 'currentColor', animation: 'blink 1s step-end infinite', verticalAlign: 'text-bottom' }}></div>
);

const ChatMessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.role === 'user';
    
    // A simple markdown parser for bold text and newlines
    const renderContent = (content: string) => {
        const parts = content.split(/(\*\*.*?\*\*|\n)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            if (part === '\n') {
                return <br key={index} />;
            }
            return part;
        });
    }

    return (
        <div style={{ display: 'flex', marginBottom: '1.5rem', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
            <div style={{
                maxWidth: '80%',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                backgroundColor: isUser ? '#4f46e5' : '#eef2ff',
                color: isUser ? '#fff' : '#1e293b',
                borderTopLeftRadius: !isUser ? '0.25rem' : '1rem',
                borderTopRightRadius: isUser ? '0.25rem' : '1rem',
                lineHeight: '1.6'
            }}>
                {renderContent(message.content)}
                {message.role === 'model' && message.content === '' && <TypingIndicator />}
            </div>
        </div>
    )
};

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5 12 2z"></path></svg>
);
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);


export default AITutorView;
