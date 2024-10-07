import { useRef, useState } from 'react';
import { Box, Flex, Button, useDisclosure } from '@chakra-ui/react';
import Header from './components/Header';
import MapView from './components/MapView';
import LocationCard from './components/LocationCard';
import ConnectorCard from './components/ConnectorCard';
import KwCard from './components/KwCard';
import FeeCard from './components/FeeCard';
import ParkingCard from './components/ParkingCard';
import CompanyCard from './components/CompanyCard';
import InfoCard from './components/InfoCard';
import SearchBar from './components/SearchBar';
import ChargeDetail from './components/ChargeDetail';


function Main() {
  const {
    isOpen: isConnectorOpen, onToggle: onToggleConnector, onClose: onCloseConnector
  } = useDisclosure();
  const {
    isOpen: isLocationOpen, onToggle: onToggleLocation, onClose: onCloseLocation
  } = useDisclosure();
  const {
    isOpen: isKwCardOpen, onToggle: onToggleKwCard, onClose: onCloseKwCard
  } = useDisclosure();
  const {
    isOpen: isFeeCardOpen, onToggle: onToggleFeeCard, onClose: onCloseFeeCard
  } = useDisclosure();
  const {
    isOpen: isParkingCardOpen, onToggle: onToggleParkingCard, onClose: onCloseParkingCard
  } = useDisclosure();
  const {
    isOpen: isCompanyCardOpen, onToggle: onToggleCompanyCard, onClose: onCloseCompanyCard
  } = useDisclosure();

  const [cardPosition, setCardPosition] = useState({ top: '0', left: '0' });
  const [openCard, setOpenCard] = useState(null); // 현재 열린 카드 상태를 관리
  const [chargerData, setChargerData] = useState([]);
  const [selectedCharger, setSelectedCharger] = useState(null);
  

  const connectorButtonRef = useRef(null);
  const locationButtonRef = useRef(null);
  const speedButtonRef = useRef(null);
  const feeButtonRef = useRef(null);
  const parkingButtonRef = useRef(null);
  const companyButtonRef = useRef(null);

  const handleCardOpen = (cardName, buttonRef, onOpen) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCardPosition({ top: `${rect.bottom}px`, left: `${rect.left}px` });

      // 현재 열린 카드가 있으면 닫기
      if (openCard && openCard !== cardName) {
        switch (openCard) {
          case 'connector':
            onCloseConnector();
            break;
          case 'location':
            onCloseLocation();
            break;
          case 'kw':
            onCloseKwCard();
            break;
          case 'fee':
            onCloseFeeCard();
            break;
          case 'parking':
            onCloseParkingCard();
            break;
          case 'company':
            onCloseCompanyCard();
            break;
          default:
            break;
        }
      }

      // 카드 열기
      onOpen();
      setOpenCard(openCard === cardName ? null : cardName);
    }
  };

  // 카드 닫기 처리
  const handleCardClose = () => {
    setOpenCard(null); // 모든 버튼 상태를 초기 상태로 설정
  };

  // 버튼의 스타일을 설정하는 함수
  const buttonStyle = (cardName) => ({
    backgroundColor: openCard === cardName ? 'teal.500' : 'white',
    color: openCard === cardName ? 'white' : 'teal.500',
    borderColor: 'teal.500',
  });

  return (
    <Box className="box-wrapper">
      <Header />
      <Flex
        bg="white"
        p={4}
        borderBottom="1px solid #e2e8f0"
        align="center"
        width="100%"
        zIndex={1}
        position="relative"
        justify="start"
        gap={4}
      >
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('connector', connectorButtonRef, onToggleConnector)}
          ref={connectorButtonRef}
          {...buttonStyle('connector')}
        >
          커넥터
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('kw', speedButtonRef, onToggleKwCard)}
          ref={speedButtonRef}
          {...buttonStyle('kw')}
        >
          충전속도
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('fee', feeButtonRef, onToggleFeeCard)}
          ref={feeButtonRef}
          {...buttonStyle('fee')}
        >
          충전요금
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('parking', parkingButtonRef, onToggleParkingCard)}
          ref={parkingButtonRef}
          {...buttonStyle('parking')}
        >
          주차요금
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('location', locationButtonRef, onToggleLocation)}
          ref={locationButtonRef}
          {...buttonStyle('location')}
        >
          장소
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('company', companyButtonRef, onToggleCompanyCard)}
          ref={companyButtonRef}
          {...buttonStyle('company')}
        >
          사업자
        </Button>
      </Flex>

      {isConnectorOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={3}
        >
          <ConnectorCard onClose={() => { onCloseConnector(); handleCardClose(); }} />
        </Box>
      )}

      {isLocationOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={3}
        >
          <LocationCard onClose={() => { onCloseLocation(); handleCardClose(); }} />
        </Box>
      )}

      {isKwCardOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={3}
        >
          <KwCard onClose={() => { onCloseKwCard(); handleCardClose(); }} />
        </Box>
      )}

      {isFeeCardOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={3}
        >
          <FeeCard onClose={() => { onCloseFeeCard(); handleCardClose(); }} />
        </Box>
      )}

      {isParkingCardOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={3}
        >
          <ParkingCard onClose={() => { onCloseParkingCard(); handleCardClose(); }} />
        </Box>
      )}

      {isCompanyCardOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={3}
        >
          <CompanyCard onClose={() => { onCloseCompanyCard(); handleCardClose(); }} />
        </Box>
      )}

      <Box position="relative">
        <MapView
          setChargerData={setChargerData}
          setSelectedCharger={setSelectedCharger}
          center={selectedCharger ? { lat: selectedCharger.lat, lng: selectedCharger.lng } : null}
          zoomLevel={selectedCharger ? 3 : undefined}
        />
        <SearchBar mb={2} setSelectedCharger={setSelectedCharger}/>
        <InfoCard chargerData={chargerData} mt={2}/>
      </Box>
    </Box>
  );
}


export default Main;