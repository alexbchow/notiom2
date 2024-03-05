import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';


const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="gray.800"
      marginBottom={4}
    >
        <Flex align="center" mr={5}>
        {/* Include the N.svg image here */}
        <Box as="span" mr="6" height="48px" width="48px" position="relative" >
          <Image src="/N.svg" alt="N" layout="fill" objectFit="contain" />
        </Box>
        <Text fontSize="40px" fontWeight="bold">
          Notiom
        </Text>
      </Flex>

      <Box display="flex" alignItems="center">
      <Button colorScheme="blue" position="relative" paddingStart="3">
          {/* Place the SVG next to the button text */}
          <Box as="span" position="absolute" left="0" top="50%" transform="translateY(-50%)">
            <Image src="/create.svg" alt="Create" width={0} height={0} />
          </Box>
          <Text fontSize="40px" fontWeight="bold"></Text>
          Create
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
