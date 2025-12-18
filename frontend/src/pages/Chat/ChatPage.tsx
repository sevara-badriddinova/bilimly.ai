import React, { useState } from 'react';
import AppLayout from "../layouts/AppLayout";
import { chatApi } from '../../utils/api';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! 👋 How's your English practice today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await chatApi.sendMessage(userMessage);
      setMessages(prev => [...prev, { role: "assistant", text: response.message || response.response || "I'm here to help!" }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: "assistant", text: `Error: ${error.message || 'Failed to send message'}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
      <AppLayout>
        <div className="flex flex-col max-w-4xl mx-auto h-[80vh] bg-white rounded-2xl shadow p-6">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`p-3 rounded-xl max-w-[75%] ${
                        msg.role === "assistant" ? "bg-[#E3F2FD] self-start" : "bg-[#FFB703]/20 self-end ml-auto"
                    }`}
                >
                  {msg.text}
                </div>
            ))}
            {loading && (
              <div className="bg-[#E3F2FD] self-start p-3 rounded-xl max-w-[75%]">
                Thinking...
              </div>
            )}
          </div>
          <form onSubmit={handleSend} className="mt-4 flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-xl px-4 py-2 outline-none"
                disabled={loading}
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
      </AppLayout>
  );
}
