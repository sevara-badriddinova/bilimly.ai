import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/Landing/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/Chat/ChatPage'
import LessonsPage from './pages/Lessons/LessonsPage'
import LessonViewPage from './pages/Lessons/LessonViewPage'
import PricingPage from './pages/PricingPage'
import SignInPage from './pages/Auth/SignInPage'
import SignUpPage from './pages/Auth/SignUpPage'
import {PublicRoute} from "./routes/PublicRoute";
import {ProtectedRoute} from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  { path: '/', element:<PublicRoute><LandingPage /> </PublicRoute>},
  { path: '/dashboard', element:<ProtectedRoute><DashboardPage /> </ProtectedRoute>},
  { path: '/chat', element:<ProtectedRoute><ChatPage /></ProtectedRoute> },
  { path: '/lessons', element: <ProtectedRoute><LessonsPage /> </ProtectedRoute>},
  { path: '/lessons/:id', element: <ProtectedRoute><LessonViewPage /> </ProtectedRoute> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/auth/sign-in', element: <PublicRoute><SignInPage /></PublicRoute> },
  { path: '/auth/sign-up', element: <PublicRoute><SignUpPage /></PublicRoute> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
