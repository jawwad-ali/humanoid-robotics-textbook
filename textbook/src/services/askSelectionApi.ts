/**
 * Ask Selection API Service
 * Handles contextual questions about selected text
 */

export interface AskSelectionRequest {
  selected_text: string;
  question: string;
  chapter_slug?: string | null;
}

export interface AskSelectionResponse {
  answer: string;
  selected_text: string;
  contexts?: Array<{
    text: string;
    title: string;
    slug: string;
    heading: string;
    score: number;
  }>;
  metadata?: Record<string, any>;
}

const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:8000';
    }
    return '/api';
  }
  return process.env.NEXT_PUBLIC_API_URL || '';
};

export async function askSelection(
  selectedText: string,
  question: string,
  chapterSlug?: string | null
): Promise<AskSelectionResponse> {
  const requestBody: AskSelectionRequest = {
    selected_text: selectedText,
    question: question,
    chapter_slug: chapterSlug,
  };

  const apiUrl = getApiUrl();
  const endpoint = `${apiUrl}/ask-selection`;

  console.log('Calling API:', endpoint);
  console.log('Request body:', requestBody);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: 'Failed to get response',
      }));
      console.error('API error:', errorData);
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Network or parse error:', error);
    throw error;
  }
}
