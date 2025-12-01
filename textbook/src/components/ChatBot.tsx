"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, X, Maximize2, MessageCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface ChatRequest {
  query: string
  top_k?: number
  chapter_slug?: string | null
}

interface ChatResponse {
  answer: string
  contexts?: Array<{
    content: string
    metadata: Record<string, any>
  }>
}

const API_BASE_URL = "http://localhost:8000"

async function sendChatMessage(
  query: string,
  topK: number = 3,
  chapterSlug: string | null = null
): Promise<ChatResponse> {
  const requestBody: ChatRequest = {
    query,
    top_k: topK,
    chapter_slug: chapterSlug,
  }

  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: "Failed to parse error response",
    }))
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

const SUGGESTED_QUESTIONS = [
  "What is Humanoid Robotics?",
  "What are the main topics covered?",
  "How do I access the resources?",
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
      const response = await sendChatMessage(message)
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.answer,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
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
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          width: "4rem",
          height: "4rem",
          borderRadius: "50%",
          background: "#1cd98e",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(28, 217, 142, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          zIndex: 9999,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "#19c380"
          e.currentTarget.style.boxShadow = "0 15px 35px rgba(28, 217, 142, 0.6)"
          e.currentTarget.style.transform = "scale(1.05)"
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "#1cd98e"
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(28, 217, 142, 0.4)"
          e.currentTarget.style.transform = "scale(1)"
        }}
        aria-label="Open chat"
      >
        <MessageCircle style={{ width: "2rem", height: "2rem" }} />
      </button>
    )
  }

  return (
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      right: "1.5rem",
      width: isExpanded ? "50rem" : "24rem",
      height: isExpanded ? "90vh" : "500px",
      background: "white",
      borderRadius: "1rem",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      zIndex: 9999,
      overflow: "hidden",
      transition: "all 0.3s ease",
    }}>
      {/* Header */}
      <div style={{
        background: "#1cd98e",
        color: "white",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <MessageCircle style={{ width: "1.25rem", height: "1.25rem" }} />
          </div>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, margin: 0 }}>Chat</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: "0.5rem",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              borderRadius: "0.5rem",
              transition: "background 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#19c380"}
            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
            aria-label={isExpanded ? "Minimize" : "Expand"}
          >
            <Maximize2 style={{ width: "1.25rem", height: "1.25rem" }} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              padding: "0.5rem",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              borderRadius: "0.5rem",
              transition: "background 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#19c380"}
            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
            aria-label="Close"
          >
            <X style={{ width: "1.25rem", height: "1.25rem" }} />
          </button>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}>
        {messages.map((message) => (
          <div key={message.id} style={{
            display: "flex",
            justifyContent: message.type === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              maxWidth: isExpanded ? "40rem" : "18rem",
              wordWrap: "break-word",
              background: message.type === "user" ? "#1cd98e" : "#e5e7eb",
              color: message.type === "user" ? "white" : "#1f2937",
              borderBottomRightRadius: message.type === "user" ? 0 : "0.75rem",
              borderBottomLeftRadius: message.type === "bot" ? 0 : "0.75rem",
              boxShadow: message.type === "user" ? "0 2px 8px rgba(28, 217, 142, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
              whiteSpace: "pre-wrap",
            }}>
              {message.content}
            </div>
          </div>
        ))}

        {messages.length === 1 && !isLoading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem", paddingTop: "0.5rem" }}>
            {SUGGESTED_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.75rem",
                  background: "white",
                  border: "1px solid #d1d5db",
                  color: "#374151",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#1cd98e"
                  e.currentTarget.style.background = "#f9fafb"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db"
                  e.currentTarget.style.background = "white"
                }}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              background: "#e5e7eb",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              borderBottomLeftRadius: 0,
            }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <div style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  background: "#6b7280",
                  borderRadius: "50%",
                  animation: "bounce 1.4s infinite ease-in-out both",
                  animationDelay: "-0.32s",
                }} />
                <div style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  background: "#6b7280",
                  borderRadius: "50%",
                  animation: "bounce 1.4s infinite ease-in-out both",
                  animationDelay: "-0.16s",
                }} />
                <div style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  background: "#6b7280",
                  borderRadius: "50%",
                  animation: "bounce 1.4s infinite ease-in-out both",
                }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        borderTop: "1px solid #e5e7eb",
        padding: "1rem",
        background: "white",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
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
            style={{
              flex: 1,
              padding: "0.625rem 1rem",
              borderRadius: "0.75rem",
              background: "#f3f4f6",
              border: "1px solid #d1d5db",
              color: "#374151",
              fontSize: "0.875rem",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#1cd98e"
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(28, 217, 142, 0.1)"
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db"
              e.currentTarget.style.boxShadow = "none"
            }}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            style={{
              padding: "0.625rem 1rem",
              background: isLoading || !inputValue.trim() ? "#9ca3af" : "#1cd98e",
              color: "white",
              border: "none",
              borderRadius: "0.75rem",
              cursor: isLoading || !inputValue.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 500,
              opacity: isLoading || !inputValue.trim() ? 0.5 : 1,
            }}
            onMouseOver={(e) => {
              if (!isLoading && inputValue.trim()) {
                e.currentTarget.style.background = "#19c380"
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading && inputValue.trim()) {
                e.currentTarget.style.background = "#1cd98e"
              }
            }}
            aria-label="Send message"
          >
            <Send style={{ width: "1.25rem", height: "1.25rem" }} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
