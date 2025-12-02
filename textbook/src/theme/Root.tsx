import React, { useState } from 'react';
import { useTextSelection } from '../hooks/useTextSelection';
import TextSelectionButton from '../components/TextSelectionButton';
import AskAIModal from '../components/AskAIModal';

export default function Root({ children} : { children: React.ReactNode }) {
  console.log('Root component mounted');
  const { selection, clearSelection } = useTextSelection();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('Root component render, selection:', selection);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    clearSelection();
  };

  return (
    <>
      {children}
      <TextSelectionButton selection={selection} onClick={handleButtonClick} />
      <AskAIModal
        selectedText={selection.text}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}
