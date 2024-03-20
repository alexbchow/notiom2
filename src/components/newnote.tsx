// components/NewDocument.tsx
import { useState } from 'react';
import { useModalContext } from '../contexts/ModalContext';
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
  Textarea,
  Box,
  Flex,
  Image
} from '@chakra-ui/react';


const NewDocument = () => {
  const { isOpen, onOpen, onClose } = useModalContext();
  // const [documents, setDocuments] = useState(Array(12).fill(null));
  const [currentDocIndex, setCurrentDocIndex] = useState<number | null>(null);
  const [currentText, setCurrentText] = useState("");
  const [documents, setDocuments] = useState<string[]>([]);

  // const handleOpenModal = (index) => {
  //   setCurrentDocIndex(index);
  //   setCurrentText(documents[index] || "");
  //   onOpen();
  // };

  // const handleSaveDocument = () => {
  //   const newDocuments = [...documents];
  //   newDocuments[currentDocIndex] = currentText;
  //   setDocuments(newDocuments);
  //   setCurrentText(""); // Clear the text area after saving
  //   onClose();
  // };

  const handleOpenModal = (index: number | null) => {
    // setCurrentDocIndex(index);
    // setCurrentText(documents[index] || "");
    // onOpen();

    setCurrentDocIndex(index);

    // if index is null, we are creating a new document
    // otherwise, we are editing an existing document, so we fill the text area with the current document's text
    setCurrentText(index === null ? "" : documents[index] || "");
    onOpen();
  };

  const handleSaveDocument = () => {
    // if (currentDocIndex !== null) { // Check to avoid null index
    //   const newDocuments = [...documents];
    //   newDocuments[currentDocIndex] = currentText;
    //   setDocuments(newDocuments);
    //   setCurrentText(""); // Clear the text area after saving
    //   onClose();
    // }

      // if currentDocIndex is null, we are creating a new document
    if (currentDocIndex === null) {
      setDocuments(prevDocuments => [...prevDocuments, currentText]);
      onClose();
    } else {
      // otherwise, we update the existing document at the current index
      setDocuments(prevDocuments =>
        prevDocuments.map((doc, index) =>
          index === currentDocIndex ? currentText : doc
        )
      );

      setCurrentText("");
      onClose();
    }
  };

  return (
    <>
      <Flex display='flex' alignItems='center' justifyContent='space-evenly' width='100%'>
        <SimpleGrid columns={6} spacing={4} width='100%' px={10}>
          {/* new document button - comes first in order to add on the left */}
          <Box p={0} borderWidth="3px" borderRadius="lg" bg="#2F80ED" height="150px" width='150px'>
            <Button onClick={() => handleOpenModal(null)} width='100%' height='100%' padding="0" background="transparent" _hover={{ bg: '#2F80ED', textDecoration: 'none' }}>
              <Image src="/notiom_doc.png" alt="Document" width='100%' height='100%' objectFit="cover" />
              <Image src="/notiom_plus.png" alt="Add" position="absolute" top="1" right="1" boxSize="16px" />
            </Button>
          </Box>
          {/* existing documents */}
          {documents.map((doc, index) => (
            <Box key={index} p={0} borderWidth="3px" borderRadius="lg" bg="white" height="150px" width='150px'>
              <Button onClick={() => handleOpenModal(index)} width='100%' height='100%' padding="0" background="transparent" _hover={{ bg: '#F8F8F8', textDecoration: 'none' }}>
                {doc.substring(0, 10)}...
              </Button>
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