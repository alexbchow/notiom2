import { Box, Heading, Text } from '@chakra-ui/react';

const MainText = () => {
  return (
    <Box textAlign="center" p={5}>
      <Heading fontSize="60px" mb={4} fontWeight = '600' color='gray.600'>
        Create. Explore.
      </Heading>
      <Text fontSize="40px" fontWeight = '500' color='gray.600'>
        The document editing software you’ve been waiting for
      </Text>
    </Box>
  );
};

export default MainText;
