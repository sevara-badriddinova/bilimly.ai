import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import PublicLayout from './layouts/PublicLayout'
import ProtectedLayout from "./layouts/ProtectedLayout"
import { AuthProvider } from "./context/AuthContext"

const LandingPage = lazy(() => import('./pages/Landing/LandingPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ChatPage = lazy(() => import('./pages/Chat/ChatPage'))
const LessonsPage = lazy(() => import('./pages/Lessons/LessonsPage'))
const LessonViewPage = lazy(() => import('./pages/Lessons/LessonViewPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const SignInPage = lazy(() => import('./pages/Auth/SignInPage'))
const SignUpPage = lazy(() => import('./pages/Auth/SignUpPage'))
const GrammarPage = lazy(() => import('./pages/Grammar/GrammarPage'))
const GrammarLessonPage = lazy(() => import('./pages/Grammar/GrammarLessonPage'))
const VocabularyPage = lazy(() => import('./pages/Vocabulary/VocabularyPage'))
const VocabularyLessonPage = lazy(() => import('./pages/Vocabulary/VocabularyLessonPage'))
const SpeakingPage = lazy(() => import('./pages/Speaking/SpeakingPage'))
const SpeakingLessonPage = lazy(() => import('./pages/Speaking/SpeakingLessonPage'))
const ListeningPage = lazy(() => import('./pages/Listening/ListeningPage'))
const ListeningLessonPage = lazy(() => import('./pages/Listening/ListeningLessonPage'))
const AccountPage = lazy(() => import('./pages/Account/AccountPage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-[#0EA5C9] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function wrap(el: React.ReactElement) {
  return <Suspense fallback={<PageLoader />}>{el}</Suspense>
}

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: wrap(<LandingPage />) },
      { path: "/auth/sign-in", element: wrap(<SignInPage />) },
      { path: "/auth/sign-up", element: wrap(<SignUpPage />) },
      { path: "/pricing", element: wrap(<PricingPage />) },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: wrap(<DashboardPage />) },
          { path: "/chat", element: wrap(<ChatPage />) },
          { path: "/lessons", element: wrap(<LessonsPage />) },
          { path: "/lessons/:id", element: wrap(<LessonViewPage />) },
          { path: "/grammar", element: wrap(<GrammarPage />) },
          { path: "/grammar/:unitId", element: wrap(<GrammarLessonPage />) },
          { path: "/vocabulary", element: wrap(<VocabularyPage />) },
          { path: "/vocabulary/:themeId", element: wrap(<VocabularyLessonPage />) },
          { path: "/speaking", element: wrap(<SpeakingPage />) },
          { path: "/speaking/:lessonId", element: wrap(<SpeakingLessonPage />) },
          { path: "/listening", element: wrap(<ListeningPage />) },
          { path: "/listening/:lessonId", element: wrap(<ListeningLessonPage />) },
          { path: "/account", element: wrap(<AccountPage />) },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)