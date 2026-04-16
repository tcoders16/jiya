"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Shayari } from "./ShayariRotator";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  shayari: Shayari | null;
};

export default function ShayariChatBox({ shayari }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !shayari || loading) return;

    const userMsg = { role: "user" as const, content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat-shayari", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          shayari: shayari.text,
          translation: shayari.translation,
          meaning: shayari.meaning,
          message: input,
          history: messages,
        }),
      });

      const data = await res.json();
      if (data.response) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.response },
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-0 right-0 w-[320px] h-[420px] rounded-2xl border border-hair bg-surface shadow-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-hair flex items-center justify-between bg-surface">
              <span className="text-[13px] font-500 text-ink">Reflect</span>
              <button
                onClick={() => setOpen(false)}
                className="text-inkSoft hover:text-ink text-[16px]"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-3">
              {messages.length === 0 && (
                <div className="text-center pt-4">
                  <p className="text-[12px] text-inkSoft leading-[1.5]">
                    Ask anything about this shayari
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[240px] rounded-lg px-3 py-2 text-[13px] leading-[1.5] ${
                      msg.role === "user"
                        ? "bg-accent/20 text-ink"
                        : "bg-surface/80 border border-hair text-inkSoft"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface/80 border border-hair rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-inkSoft animate-pulse" />
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-inkSoft animate-pulse"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-inkSoft animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-hair p-3 flex gap-2 bg-surface">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask..."
                className="flex-1 bg-transparent text-[13px] outline-none text-ink placeholder-inkSoft"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="text-accent hover:opacity-75 disabled:opacity-50 text-[16px]"
              >
                ↑
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-accent text-bg flex items-center justify-center shadow-lg border border-accent/80"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </div>
  );
}
