import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { getToken } from '../../context/AuthContext';

const ReactMarkdown = lazy(() => import('react-markdown'));
import remarkGfm from 'remark-gfm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface Message { role: 'assistant' | 'user'; text: string; }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: `Hi there 👋 I'm your Bilimly AI tutor. Ask me anything about English — grammar, vocabulary, pronunciation, or practice sentences. I can explain in Uzbek, Russian, or English!` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        setMessages(prev => [...prev, { role: 'assistant', text: 'You are not logged in.' }]);
        return;
      }
      const response = await axios.post(
        `${API_URL}/api/ai/chat`,
        { message: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(prev => [...prev, { role: 'assistant', text: response.data }]);
    } catch (err: any) {
      const status = err?.response?.status;
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `I'm having trouble connecting right now. Please try again in a moment.\n*Error details: ${status || err?.message}*`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Explain Present Simple',
    'What is the difference between "make" and "do"?',
    'Give me 5 useful phrases',
    'Check my grammar',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-0px)]" style={{ background: '#F0F6FF' }}>

      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3 shrink-0"
        style={{ background: '#0D1B2A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
          style={{ background: 'rgba(14,165,201,0.2)' }}>💬</div>
        <div>
          <h1 className="font-bold text-white text-sm">AI Tutor</h1>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>English learning assistant</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm mr-2 mt-1 shrink-0"
                  style={{ background: 'rgba(14,165,201,0.15)' }}>🦉</div>
              )}
              <div
                className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={msg.role === 'assistant' ? {
                  background: 'white',
                  color: '#0D1B2A',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  borderTopLeftRadius: 4,
                } : {
                  background: 'linear-gradient(135deg, #0EA5C9, #0284C7)',
                  color: 'white',
                  borderBottomRightRadius: 4,
                }}
              >
                {msg.role === 'assistant' ? (
                  <Suspense fallback={<span>{msg.text}</span>}>
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-li:my-0.5">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                    </div>
                  </Suspense>
                ) : msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm mr-2 shrink-0"
              style={{ background: 'rgba(14,165,201,0.15)' }}>🦉</div>
            <div className="rounded-2xl px-4 py-3" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', borderTopLeftRadius: 4 }}>
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(i => (
                  <motion.span key={i} className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#0EA5C9' }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts — only show when no user messages yet */}
      {messages.length === 1 && (
        <div className="px-4 pb-3 flex gap-2 flex-wrap shrink-0">
          {quickPrompts.map(p => (
            <button key={p} onClick={() => setInput(p)}
              className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
              style={{ background: 'white', border: '1px solid rgba(14,165,201,0.3)', color: '#0284C7' }}>
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 shrink-0">
        <form onSubmit={handleSend} className="flex gap-2 items-center p-2 rounded-2xl"
          style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message in English or Uzbek..."
            className="flex-1 text-sm px-3 py-2 outline-none bg-transparent"
            style={{ color: '#0D1B2A' }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #0EA5C9, #0284C7)', color: 'white' }}
          >
            {loading ? '...' : 'Send →'}
          </button>
        </form>
      </div>
    </div>
  );
}