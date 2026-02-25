import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/Landing/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/Chat/ChatPage'
import LessonsPage from './pages/Lessons/LessonsPage'
import LessonViewPage from './pages/Lessons/LessonViewPage'
import PublicLayout from './layouts/PublicLayout'
import PricingPage from './pages/PricingPage'
import SignInPage from './pages/Auth/SignInPage'
import SignUpPage from './pages/Auth/SignUpPage'
import ProtectedLayout from "./layouts/ProtectedLayout";
import {AuthProvider} from "./context/AuthContext";
import GrammarPage from './pages/Grammar/GrammarPage'
import GrammarLessonPage from './pages/Grammar/GrammarLessonPage'
import VocabularyPage from './pages/Vocabulary/VocabularyPage'
import VocabularyLessonPage from './pages/Vocabulary/VocabularyLessonPage'
import SpeakingPage from './pages/Speaking/SpeakingPage'
import ListeningPage from './pages/Listening/ListeningPage'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/auth/sign-in", element: <SignInPage /> },
      { path: "/auth/sign-up", element: <SignUpPage /> },
      { path: "/pricing", element: <PricingPage /> },
    ],
  },
  {
    element: <ProtectedLayout />, // checks token + /me, blocks if not authed
    children: [
      {
        element: <AppLayout />, // navbar + sidebar + outlet
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/chat", element: <ChatPage /> },
          { path: "/lessons", element: <LessonsPage /> },
          { path: "/lessons/:id", element: <LessonViewPage /> },
          { path: "/grammar", element: <GrammarPage /> },
          { path: "/grammar/:unitId", element: <GrammarLessonPage /> },
          { path: "/vocabulary", element: <VocabularyPage /> },
          { path: "/vocabulary/:themeId", element: <VocabularyLessonPage /> },
          { path: "/speaking", element: <SpeakingPage /> },
          { path: "/speaking/:lessonId", element: <div>Speaking Lesson (Coming Soon)</div> },
          { path: "/listening", element: <ListeningPage /> },
          { path: "/listening/:lessonId", element: <div>Listening Lesson (Coming Soon)</div> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);