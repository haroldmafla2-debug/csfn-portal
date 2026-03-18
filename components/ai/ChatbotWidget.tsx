'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, GraduationCap } from 'lucide-react'
import type { ChatMessage } from '@/types'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente virtual del Colegio San Felipe Neri. ¿En qué le puedo ayudar hoy?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: newMessages.slice(-10), // Last 10 messages for context
        }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Lo siento, ocurrió un error. Por favor intente de nuevo o comuníquese al 322 458 13 69.',
        },
      ])
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col" style={{ height: '450px' }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ backgroundColor: '#1B3A6B' }}>
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" style={{ color: '#C8A951' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold leading-tight">Asistente CSFN</p>
              <p className="text-xs text-white/60">Colegio San Felipe Neri</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: '#F5F7FA' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'text-white rounded-br-sm'
                      : 'bg-white text-gray-700 rounded-bl-sm shadow-sm'
                  }`}
                  style={msg.role === 'user' ? { backgroundColor: '#1B3A6B' } : {}}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escriba su pregunta..."
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1B3A6B]"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: '#1B3A6B' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-110 relative"
        style={{ backgroundColor: '#1B3A6B' }}
        aria-label="Abrir asistente virtual"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center text-white" style={{ backgroundColor: '#C8A951' }}>
              ?
            </span>
          </>
        )}
      </button>
    </div>
  )
}
