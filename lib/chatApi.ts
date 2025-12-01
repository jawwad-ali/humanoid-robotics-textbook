/**
 * Chat API Service
 * Handles communication with the FastAPI backend
 */

export interface ChatRequest {
  query: string
  top_k?: number
  chapter_slug?: string | null
}

export interface ChatContext {
  content: string
  metadata: {
    chapter?: string
    section?: string
    page?: number
  }
}

export interface ChatResponse {
  answer: string
  contexts?: ChatContext[]
}

export interface ChatError {
  error: string
  detail?: string
}

const API_BASE_URL = typeof window !== 'undefined' 
  ? (window as any).ENV?.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

/**
 * Send a chat message to the backend and get a response
 * @param query - The user's question
 * @param topK - Number of relevant contexts to retrieve (default: 3)
 * @param chapterSlug - Optional chapter slug to filter results
 * @returns Promise with the chat response
 */
export async function sendChatMessage(
  query: string,
  topK: number = 3,
  chapterSlug: string | null = null
): Promise<ChatResponse> {
  try {
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
      const errorData: ChatError = await response.json().catch(() => ({
        error: "Failed to parse error response",
      }))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data: ChatResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error sending chat message:", error)
    
    // Re-throw with a user-friendly message
    if (error instanceof Error) {
      throw new Error(`Failed to get response: ${error.message}`)
    }
    throw new Error("An unexpected error occurred while processing your request")
  }
}

/**
 * Check if the chat API is available
 * @returns Promise with boolean indicating API availability
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
    })
    return response.ok
  } catch (error) {
    console.error("API health check failed:", error)
    return false
  }
}
