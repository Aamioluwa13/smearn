export enum View {
    DASHBOARD = 'dashboard',
    PAST_QUESTIONS = 'past_questions',
    AI_TUTOR = 'ai_tutor',
    FLASHCARDS = 'flashcards',
    VIDEOS = 'videos',
    TEXTBOOKS = 'textbooks'
}

export interface Question {
    id: number;
    text: string;
    options: string[];
    answer: string;
}

export enum Subject {
    MATHEMATICS = 'Mathematics',
    ENGLISH = 'English Language',
    PHYSICS = 'Physics',
    CHEMISTRY = 'Chemistry',
    BIOLOGY = 'Biology',
    LITERATURE_IN_ENGLISH = 'Literature in English',
    GOVERNMENT = 'Government',
    CRS = 'Christian Religious Studies',
    ECONOMICS = 'Economics'
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export interface TutorialVideo {
    id: string; // YouTube Video ID
    title: string;
    description: string;
    subject: Subject;
}

export interface Flashcard {
    question: string;
    answer: string;
    subject: Subject;
}

export interface Textbook {
    id: number;
    title: string;
    subject: Subject;
    description: string;
    coverUrl: string;
    downloadUrl: string;
    isPremium: boolean;
}