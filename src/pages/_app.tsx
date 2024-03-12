'use client'
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme'; 
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ModalProvider } from '@/contexts/ModalContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </ChakraProvider>
  );
}
export default App
