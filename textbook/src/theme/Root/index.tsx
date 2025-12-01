import React, { ReactNode } from 'react';
import ChatBot from '../../components/ChatBot';

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps): JSX.Element {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
}
