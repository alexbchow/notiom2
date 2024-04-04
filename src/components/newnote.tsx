import { useState, useEffect } from 'react';
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
  Image,
  useToast
} from '@chakra-ui/react';

const NewDocument = () => {
  const { isOpen, onOpen, onClose } = useModalContext();
  const [documents, setDocuments] = useState<any[]>([]);
  const [currentDoc, setCurrentDoc] = useState<any>(null);
  const [currentText, setCurrentText] = useState('');
  const toast = useToast();

  // Fetch all documents when the component mounts
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/getDocs');
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Failed to fetch documents', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleOpenModal = (doc: any) => {
    setCurrentDoc(doc);
    setCurrentText(doc ? doc.body : ''); // Set currentText based on whether we're editing
    onOpen();
  };

  const handleSaveDocument = async () => {
    const bodyData: BodyData = {
      title: 'New Document', // Consider dynamically setting this
      body: currentText,
      user_id: 'someUserId', // Replace with actual user ID logic
    };

    // If you're updating an existing document, add its 'id' to bodyData
    if (currentDoc && currentDoc._id) {
      bodyData.id = currentDoc._id; // Assuming '_id' is the identifier used by MongoDB
    }

    // Determine the appropriate API endpoint and HTTP method based on whether you're creating or updating a document
    const apiEndpoint = currentDoc ? '/api/updateDoc' : '/api/createDoc';
    const method = 'POST'; // This could be dynamic if necessary

    try {
      const response = await fetch(apiEndpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      toast({
        title: currentDoc ? 'Document Updated' : 'Document Created',
        description: `The document has been ${currentDoc ? 'updated' : 'created'}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchDocuments(); // Refresh the documents
    } catch (error) {
      console.error('Failed to save document', error);
      toast({
        title: 'Error',
        description: `There was an error ${currentDoc ? 'updating' : 'creating'} the document.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
    setCurrentDoc(null); // Reset currentDoc
    setCurrentText(''); // Reset currentText
  };


  const handleDeleteDocument = async (docId: string) => {
    try {
      const response = await fetch(`/api/deleteDoc?docId=${docId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting document');
      }
      toast({
        title: 'Document deleted',
        description: 'The document has been deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchDocuments(); // Re-fetch documents
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error deleting the document.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/getDocs');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Failed to fetch documents', error);
    }
  };

  return (
    <>
      <Flex display='flex' alignItems='center' justifyContent='space-evenly' width='100%'>
        <SimpleGrid columns={6} spacing={4} width='100%' px={10}>
          {/* New document button */}
          <Box p={0} borderWidth="3px" borderRadius="lg" bg="#2F80ED" height="150px" width='150px'>
            <Button onClick={() => handleOpenModal(null)} width='100%' height='100%' padding="0" background="transparent" _hover={{ bg: '#2F80ED', textDecoration: 'none' }}>
              <Image src="/notiom_doc.png" alt="Document" width='100%' height='100%' objectFit="cover" />
              <Image src="/notiom_plus.png" alt="Add" position="absolute" top="1" right="1" boxSize="16px" />
            </Button>
          </Box>
          {/* Existing documents */}
          {documents.map((doc, index) => (
            <Box key={index} p={0} borderWidth="3px" borderRadius="lg" bg="white" height="150px" width='150px'>
              <Button onClick={() => handleOpenModal(doc)} width='100%' height='100%' padding="0" background="transparent" _hover={{ bg: '#F8F8F8', textDecoration: 'none' }}>
                {doc.title.substring(0, 10)}...
              </Button>
              <Button onClick={() => handleDeleteDocument(doc._id)} size="xs" colorScheme="red" position="absolute" top="1" right="1">X</Button>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentDoc ? 'Edit Document' : 'Create New Document'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              id="textArea"
              placeholder="Enter your text"
              value={currentText} // Use currentText for the value
              color="gray.800"
              onChange={(e) => setCurrentText(e.target.value)} // Update currentText on change
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveDocument}>
              Save
            </Button>
            {currentDoc && (
              <Button colorScheme="red" onClick={() => handleDeleteDocument(currentDoc._id)}>
                Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewDocument;