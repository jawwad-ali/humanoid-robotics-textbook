import React from 'react';
import { SelectionState } from '../hooks/useTextSelection';

interface TextSelectionButtonProps {
  selection: SelectionState;
  onClick: () => void;
}

export default function TextSelectionButton({ selection, onClick }: TextSelectionButtonProps) {
  console.log('TextSelectionButton render:', selection);

  if (!selection.isSelected || !selection.position) {
    return null;
  }

  console.log('Rendering button at position:', selection.position);

  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: `${selection.position.top + 10}px`,
        left: `${selection.position.left}px`,
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: '#1cd98e',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(28, 217, 142, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = '#19c380';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(28, 217, 142, 0.6)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = '#1cd98e';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(28, 217, 142, 0.4)';
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      ASK AI
    </button>
  );
}
