
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#023047]">
          Welcome back, {user?.email?.split('@')[0] || 'Student'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Ready to improve your English today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Grammar Card */}
        <div
          onClick={() => navigate('/grammar')}
          className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-xl font-bold text-[#023047] mb-2">Grammar</h3>
          <p className="text-gray-600 text-sm">
            Master English grammar with 150+ interactive exercises
          </p>
        </div>

        {/* Vocabulary Card */}
        <div
          onClick={() => navigate('/vocabulary')}
          className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-[#023047] mb-2">Vocabulary</h3>
          <p className="text-gray-600 text-sm">
            Build your word bank with 250+ essential words
          </p>
        </div>

        {/* Speaking Card */}
        <div
          onClick={() => navigate('/speaking')}
          className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">🗣️</div>
          <h3 className="text-xl font-bold text-[#023047] mb-2">Speaking</h3>
          <p className="text-gray-600 text-sm">
            Practice pronunciation with guided exercises
          </p>
        </div>

        {/* Listening Card */}
        <div
          onClick={() => navigate('/listening')}
          className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">🎧</div>
          <h3 className="text-xl font-bold text-[#023047] mb-2">Listening</h3>
          <p className="text-gray-600 text-sm">
            Improve comprehension with audio exercises
          </p>
        </div>

        {/* Chat Card */}
        <div
          onClick={() => navigate('/chat')}
          className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-bold text-[#023047] mb-2">AI Tutor Chat</h3>
          <p className="text-gray-600 text-sm">
            Practice English with your AI tutor
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 opacity-50">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-[#023047] mb-2">Progress</h3>
          <p className="text-gray-600 text-sm">
            Track your learning journey (Coming soon)
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-gradient-to-r from-[#023047] to-[#0F4C75] rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Your Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm opacity-80">Lessons Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm opacity-80">Words Learned</div>
          </div>
          <div>
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm opacity-80">Days Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
}
