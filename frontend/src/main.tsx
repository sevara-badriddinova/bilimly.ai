import {StrictMode, lazy, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import './i18n'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import PublicLayout from './layouts/PublicLayout'
import ProtectedLayout from "./layouts/ProtectedLayout"
import {AuthProvider} from "./context/AuthContext"

const LandingPage = lazy(() => import('./pages/Landing/LandingPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ChatPage = lazy(() => import('./pages/Chat/ChatPage'))
const LessonsPage = lazy(() => import('./pages/Lessons/LessonsPage'))
const LessonViewPage = lazy(() => import('./pages/Lessons/LessonViewPage'))
const SignInPage = lazy(() => import('./pages/Auth/SignInPage'))
const SignUpPage = lazy(() => import('./pages/Auth/SignUpPage'))
const GrammarPage = lazy(() => import('./pages/Grammar/GrammarPage'))
const VocabularyPage = lazy(() => import('./pages/Vocabulary/VocabularyPage'))
const SpeakingPage = lazy(() => import('./pages/Speaking/SpeakingPage'))
const ListeningPage = lazy(() => import('./pages/Listening/ListeningPage'))
const AccountPage = lazy(() => import('./pages/Account/AccountPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const RequireAdmin = lazy(() => import('./layouts/RequireAdmin'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const AdminOverviewPage = lazy(() => import('./pages/Admin/AdminOverviewPage'))
const AdminAnalyticsPage = lazy(() => import('./pages/Admin/AdminAnalyticsPage'))
const AdminUsersPage = lazy(() => import('./pages/Admin/AdminUsersPage'))
const AdminTtsPage = lazy(() => import('./pages/Admin/AdminTtsPage'))
const AdminAiPage = lazy(() => import('./pages/Admin/AdminAiPage'))
const AdminAuditPage = lazy(() => import('./pages/Admin/AdminAuditPage'))
const AdminSettingsPage = lazy(() => import('./pages/Admin/AdminSettingsPage'))

function PageLoader() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-4 border-[#0EA5C9] border-t-transparent rounded-full animate-spin"/>
        </div>
    )
}

function wrap(el: React.ReactElement) {
    return <Suspense fallback={<PageLoader/>}>{el}</Suspense>
}

const router = createBrowserRouter([
    {
        element: <PublicLayout/>,
        children: [
            {path: "/", element: wrap(<LandingPage/>)},
            {path: "/signin", element: wrap(<SignInPage/>)},
            {path: "/signup", element: wrap(<SignUpPage/>)},
            {path: "/auth/sign-in", element: wrap(<SignInPage/>)},
            {path: "/auth/sign-up", element: wrap(<SignUpPage/>)},
            {path: "/lessons", element: wrap(<LessonsPage/>)},
            {path: "/lessons/:id", element: wrap(<LessonViewPage/>)},
        ],
    },
    {
        element: <ProtectedLayout/>,
        children: [
            {
                path: "/admin",
                element: wrap(<RequireAdmin><AdminLayout/></RequireAdmin>),
                children: [
                    {index: true, element: wrap(<AdminOverviewPage/>)},
                    {path: "analytics", element: wrap(<AdminAnalyticsPage/>)},
                    {path: "users", element: wrap(<AdminUsersPage/>)},
                    {path: "tts", element: wrap(<AdminTtsPage/>)},
                    {path: "ai", element: wrap(<AdminAiPage/>)},
                    {path: "audit", element: wrap(<AdminAuditPage/>)},
                    {path: "settings", element: wrap(<AdminSettingsPage/>)},
                ],
            },
            {
                element: <AppLayout/>,
                children: [
                    {path: "/app", element: wrap(<DashboardPage/>)},
                    {path: "/app/coach", element: wrap(<ChatPage/>)},
                    {path: "/app/grammar", element: wrap(<GrammarPage/>)},
                    {path: "/app/vocabulary", element: wrap(<VocabularyPage/>)},
                    {path: "/app/speaking", element: wrap(<SpeakingPage/>)},
                    {path: "/app/listening", element: wrap(<ListeningPage/>)},
                    {path: "/app/profile", element: wrap(<AccountPage/>)},
                    {path: "/app/settings", element: wrap(<SettingsPage/>)},
                    {path: "/dashboard", element: wrap(<DashboardPage/>)},
                    {path: "/chat", element: wrap(<ChatPage/>)},
                    {path: "/grammar", element: wrap(<GrammarPage/>)},
                    {path: "/vocabulary", element: wrap(<VocabularyPage/>)},
                    {path: "/speaking", element: wrap(<SpeakingPage/>)},
                    {path: "/listening", element: wrap(<ListeningPage/>)},
                    {path: "/account", element: wrap(<AccountPage/>)},
                    {path: "/settings", element: wrap(<SettingsPage/>)},
                ],
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </StrictMode>
)
