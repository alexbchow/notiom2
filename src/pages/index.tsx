import Head from 'next/head';
import Navbar from '../components/navbar';
import MainText from '../components/maintext';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme'; // Make sure you have a theme file or use Chakra's default theme

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Notiom</title>
        <meta name="description" content="The document editing software you’ve been waiting for" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <MainText />

      {/* Your content here */}
    </ChakraProvider>
  );
}
