import React, { useState } from 'react';
import AppLayout from "../layouts/AppLayout";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi Sevara! 👋 How’s your English practice today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", text: "That’s great! Let’s practice ordering coffee ☕" }]);
    }, 1000);
    setInput("");
  };

  return (
      <AppLayout>
        <div className="flex flex-col max-w-4xl mx-auto h-[80vh] bg-white rounded-2xl shadow p-6">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`p-3 rounded-xl max-w-[75%] ${
                        msg.role === "assistant" ? "bg-[#E3F2FD] self-start" : "bg-[#FFB703]/20 self-end"
                    }`}
                >
                  {msg.text}
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
            <button type="submit" className="bg-[#023047] text-white px-6 rounded-xl">
              Send
            </button>
          </form>
        </div>
      </AppLayout>
  );
}
