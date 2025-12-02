"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, Maximize2, MessageCircle } from "lucide-react"
import { sendChatMessage } from "@/lib/chatApi"

const API_BASE_URL = "http://localhost:8000"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const SUGGESTED_QUESTIONS = [
  "What is Humanoid Robotics?",
  "What is Physical AI?",
  "What are Nodes?",
]

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Greetings! 👋\n\nReady to dive in? Choose a question to get started!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 0)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Call the actual API
      const response = await sendChatMessage(message)
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.answer,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      // Handle error with a user-friendly message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unable to get a response"}. Please try again.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#1cd98e] hover:bg-[#19c380] text-white shadow-lg shadow-[#1cd98e]/40 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-[#1cd98e]/60 z-40 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 rounded-2xl h-[500px] bg-card border border-border shadow-2xl shadow-black/20 flex flex-col z-40 overflow-hidden transition-all duration-300 ${
      isExpanded ? 'w-[800px]' : 'w-96'
    }`}>
      {/* Header */}
      <div className="bg-[#1cd98e] text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold">Chat</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-primary/80 rounded-lg transition" 
            aria-label={isExpanded ? "Minimize" : "Expand"}
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-[#19c380] rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 flex flex-col">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-3 rounded-lg text-sm leading-relaxed ${
                isExpanded ? 'max-w-2xl' : 'max-w-xs'
              } ${
                message.type === "user"
                  ? "bg-[#1cd98e] text-white rounded-br-none shadow-md"
                  : "bg-gray-200 text-gray-800 rounded-bl-none shadow-sm"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {messages.length === 1 && !isLoading && (
          <div className="space-y-2 mt-4 pt-2">
            {SUGGESTED_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:border-[#1cd98e] hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage(inputValue)
              }
            }}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1cd98e]/50 focus:border-transparent transition"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-2 bg-[#1cd98e] hover:bg-[#19c380] text-white rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
