import React, { useState } from 'react';
import { askSelection } from '../services/askSelectionApi';

interface AskAIModalProps {
  selectedText: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AskAIModal({ selectedText, isOpen, onClose }: AskAIModalProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await askSelection(selectedText, question);
      setAnswer(response.answer);
    } catch (err) {
      console.error('Ask AI error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else if (err && typeof err === 'object') {
        setError(JSON.stringify(err, null, 2));
      } else {
        setError('Failed to get answer. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setQuestion('');
    setAnswer('');
    setError('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>
            Ask AI about Selection
          </h2>
          <button
            onClick={handleClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Selected Text */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
              Selected Text:
            </label>
            <div
              style={{
                padding: '12px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#1f2937',
                maxHeight: '150px',
                overflow: 'auto',
              }}
            >
              {selectedText}
            </div>
          </div>

          {/* Question Input */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                Your Question:
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about the selected text..."
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  minHeight: '80px',
                }}
              />
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                {question.length}/500 characters
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              style={{
                width: '100%',
                padding: '12px',
                background: isLoading || !question.trim() ? '#9ca3af' : '#1cd98e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: isLoading || !question.trim() ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {isLoading ? 'Generating Answer...' : 'Ask AI'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                background: '#fee2e2',
                border: '1px solid #f87171',
                borderRadius: '8px',
                color: '#b91c1c',
                fontSize: '14px',
              }}
            >
              {error}
            </div>
          )}

          {/* Answer */}
          {answer && (
            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                AI Answer:
              </label>
              <div
                style={{
                  padding: '16px',
                  background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1f2937',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {answer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
