import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getToken } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: `Hi there 👋 How's your English practice today?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const token = getToken();
      if (!token) {
        setMessages(prev => [...prev, { role: "assistant", text: "You are not logged in (token missing)." }]);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/ai/chat`,
        { message: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages(prev => [...prev, { role: "assistant", text: response.data }]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: "assistant",
        text: `Error: ${err?.response?.status || ""} ${JSON.stringify(err?.response?.data || err?.message)}`
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto h-[80vh] bg-white rounded-2xl shadow p-6">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl max-w-[75%] ${
              msg.role === "assistant" ? "bg-[#E3F2FD] self-start" : "bg-[#FFB703]/20 self-end"
            }`}
          >
            {msg.role === "assistant" ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-xl px-4 py-2 outline-none"
        />
        <button
          type="submit"
          className="bg-[#023047] text-white px-6 rounded-xl disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
