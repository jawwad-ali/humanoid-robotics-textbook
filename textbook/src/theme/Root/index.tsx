import React, { ReactNode, useState } from 'react';
import ChatBot from '../../components/ChatBot';
import { useTextSelection } from '../../hooks/useTextSelection';
import TextSelectionButton from '../../components/TextSelectionButton';
import AskAIModal from '../../components/AskAIModal';

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps): JSX.Element {
  const { selection, clearSelection } = useTextSelection();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedText, setCapturedText] = useState('');

  const handleButtonClick = () => {
    // Capture the selected text before opening modal
    setCapturedText(selection.text);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCapturedText('');
    clearSelection();
  };

  return (
    <>
      {children}
      <ChatBot />
      <TextSelectionButton selection={selection} onClick={handleButtonClick} />
      <AskAIModal
        selectedText={capturedText}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}
