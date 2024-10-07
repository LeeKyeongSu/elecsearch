import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Box } from '@chakra-ui/react';
import DaumPostcodeEmbed from 'react-daum-postcode';

const Address = ({ setAddress }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname) {
        extraAddress += data.bname;
      }
      if (data.buildingName) {
        extraAddress += extraAddress ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress); // 부모 컴포넌트로 주소를 전달
    onClose();
  };

  return (
    <>
      <Box textAlign="left" width="100%">
        <Button colorScheme="blue" onClick={onOpen}>
          주소 검색
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>주소 검색</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Address;
