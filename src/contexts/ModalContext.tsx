import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useDisclosure } from '@chakra-ui/react';

// Define the shape of the context data
interface ModalContextType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create the context with a default value
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Hook to use the context
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

// Provider component
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Provide the isOpen, onOpen, and onClose functions to the context
  const value = { isOpen, onOpen, onClose };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
