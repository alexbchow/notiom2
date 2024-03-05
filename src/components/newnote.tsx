// components/NewDocument.tsx
import { useState } from 'react';
import {
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Box,
  Flex
} from '@chakra-ui/react';

const NewDocument = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [documents, setDocuments] = useState(Array(12).fill(null));
  const [currentDocIndex, setCurrentDocIndex] = useState(null);
  const [currentText, setCurrentText] = useState("");

  const handleOpenModal = (index) => {
    setCurrentDocIndex(index);
    setCurrentText(documents[index] || "");
    onOpen();
  };

  const handleSaveDocument = () => {
    const newDocuments = [...documents];
    newDocuments[currentDocIndex] = currentText;
    setDocuments(newDocuments);
    setCurrentText(""); // Clear the text area after saving
    onClose();
  };

  return (
    <>
    <Flex display='flex' alignItems='center' justifyContent='space-evenly' width='100%'>
      <SimpleGrid columns={6} spacing={4} width='100%' px={10}>
        {documents.map((doc, index) => (
          <Box key={index} p={4} borderWidth="3px" borderRadius="lg" height="150px" width='150px'>
            {doc === null ? (
              index === 0 ? (
                <Button onClick={() => handleOpenModal(index)}>+</Button>
              ) : null
            ) : (
              <Button onClick={() => handleOpenModal(index)}>
                {doc.substring(0, 10)}...
              </Button>
            )}
          </Box>
        ))}
      </SimpleGrid>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentDocIndex === 0 ? 'Create New Document' : 'Edit Document'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              id="textArea"
              placeholder="Enter your text"
              value={currentText}
              color="gray.800"
              onChange={(e) => setCurrentText(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveDocument}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewDocument;
