import { useState, useEffect, useCallback } from 'react';

export interface SelectionPosition {
  top: number;
  left: number;
  width: number;
}

export interface SelectionState {
  text: string;
  position: SelectionPosition | null;
  isSelected: boolean;
}

export function useTextSelection() {
  const [selection, setSelection] = useState<SelectionState>({
    text: '',
    position: null,
    isSelected: false,
  });

  const handleSelectionChange = useCallback(() => {
    const selectedText = window.getSelection()?.toString().trim() || '';
    console.log('Selection detected:', selectedText, 'Length:', selectedText.length);

    if (selectedText && selectedText.length >= 5) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        console.log('Button position:', {
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX + rect.width / 2,
        });

        setSelection({
          text: selectedText,
          position: {
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX + rect.width / 2,
            width: rect.width,
          },
          isSelected: true,
        });
      }
    } else {
      setSelection({
        text: '',
        position: null,
        isSelected: false,
      });
    }
  }, []);

  useEffect(() => {
    // Add event listeners for selection changes
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [handleSelectionChange]);

  const clearSelection = useCallback(() => {
    setSelection({
      text: '',
      position: null,
      isSelected: false,
    });
    window.getSelection()?.removeAllRanges();
  }, []);

  return {
    selection,
    clearSelection,
  };
}
