import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useModalContext } from '../contexts/ModalContext';

const Navbar = () => {

  const { onOpen } = useModalContext();

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
        <Flex align="center" mr={5} cursor="pointer" _hover={{textDecoration: "none"}}>
            <Box as="span" mr="6" height="48px" width="48px" position="relative">
              <Image src="/N.svg" alt="N" layout="fill" objectFit="contain" />
            </Box>
            <Text fontSize="40px" fontWeight="bold" color="black">
              Notiom
            </Text>
        </Flex>

      <Box display="flex" alignItems="center">
        <Button colorScheme="blue" position="relative" paddingStart="3" onClick={onOpen}>
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
