import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/ChatPage'
import LessonsPage from './pages/Lessons/LessonsPage'
import LessonViewPage from './pages/Lessons/LessonViewPage'
import PricingPage from './pages/PricingPage'
import SignInPage from './pages/Auth/SignInPage'
import SignUpPage from './pages/Auth/SignUpPage'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/chat', element: <ChatPage /> },
  { path: '/lessons', element: <LessonsPage /> },
  { path: '/lessons/:id', element: <LessonViewPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/auth/sign-in', element: <SignInPage /> },
  { path: '/auth/sign-up', element: <SignUpPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
