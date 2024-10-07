import { useState, useEffect } from 'react';
import { Box, Button, Flex, VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import OwnerTable from './components/OwnerTable';
import OwnerInput from './components/Input';
import Header from './components/Header';
import ConnectType from './components/ConnectType';
import Address from './components/Address';
import Parking from './components/Parking';
import UploadCertificates from "./components/UploadCertificates.jsx";

const initialChargingStationList = [
  { statId: 1, name: 'Station1', address: '서울 영등포구 가마산로 323 상세주소', connector: 'Type1', slot: '10 chargers' },
  { statId: 2, name: 'Station2', address: 'Location2', connector: 'Type2', slot: '20 chargers' }
];

const chgerTypeMap = {
  '01': 'DC차데모',
  '02': 'AC완속',
  '03': 'DC차데모+AC3상',
  '04': 'DC콤보',
  '05': 'DC차데모+DC콤보',
  '06': 'DC차데모+AC3상+DC콤보',
  '07': 'AC3상',
  '08': 'DC콤보(완속)'
};

const Owner = () => {
  const [selectedView, setSelectedView] = useState('chargingStationList');
  const [chargingStations, setChargingStations] = useState([]);
  const [inputValues, setInputValues] = useState({
    statId: '',
    name: '',
    address: '',
    detailAddress: '',
    price: '',
    connector: '',
    speed: '',
    parkingFee: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleAddressChange = (address) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      address: address
    }));
  };

  const handleParkingFeeChange = (value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      parkingFee: value
    }));
  };

  const handleConnectTypeChange = (value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      connector: value
    }));
  };

  const handleEdit = (item) => {
    setInputValues({
      statId: item.statId,
      name: item.statNm,
      address: item.address,
      detailAddress: '',
      price: item.price,
      connector: item.connector,
      speed: item.speed,
      parkingFee: item.parkingFee
    });
    setSelectedView('editChargingStation');
  };

  const handleDelete = async (item) => {
    try {
      // item.statId가 유효한지 확인
      if (!item.statId) {
        throw new Error('Invalid item statId');
      }

      const response = await fetch(`http://34.47.120.150:8080/charger/place/deleteCharger`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statId: item.statId.toString() }), // statId를 문자열로 변환
      });

      const result = await response.text(); // JSON이 아닌 텍스트로 처리

      if (response.ok) {
        setChargingStations(prevStations =>
          prevStations.filter(station => station.statId !== item.statId) // statId로 필터링
        );
        alert(result); // 성공 메시지를 사용자에게 표시
      } else {
        console.error('Error deleting charger:', result);
        alert('오류 발생: ' + result); // 오류 메시지 표시
      }
    } catch (error) {
      console.error('Error deleting charger:', error);
      alert('오류 발생: ' + error.message); // 오류 메시지 표시
    }
  };

  const handleSubmit = async () => {
    const { statId, ...rest } = inputValues;
    const requestPayload = {
      statId: statId || '',
      statNm: rest.name,
      addr: rest.address,
      chargingFee: parseFloat(rest.price) || 0.0,
      output: rest.speed,
      chgerType: Object.keys(chgerTypeMap).find(key => chgerTypeMap[key] === rest.connector) || '',
      parkingFree: rest.parkingFee === '무료' ? 'Y' : 'N'
    };

    try {
      let response;
      if (statId) {
        response = await fetch(`http://34.47.120.150:8080/charger/place/updateCharger`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        });
      } else {
        response = await fetch('http://34.47.120.150:8080/charger/place/addCharger', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        });
      }

      const result = await response.text(); // JSON이 아닌 텍스트로 처리
      if (response.ok) {
        alert(result); // 성공 메시지를 사용자에게 표시
        if (statId) {
          setChargingStations(prevStations =>
            prevStations.map(station =>
              station.statId === statId ? { ...inputValues } : station // statId로 업데이트
            )
          );
        } else {
          setChargingStations(prevStations => [
            ...prevStations,
            { statId: Date.now(), ...inputValues } // 새 충전소 추가 시 statId로 설정
          ]);
        }
      } else {
        console.error('Error submitting charger:', result);
        alert('오류 발생: ' + result); // 오류 메시지 표시
      }
    } catch (error) {
      console.error('Error submitting charger:', error);
      alert('오류 발생: ' + error.message); // 오류 메시지 표시
    }

    setSelectedView('chargingStationList');
  };

  const renderContent = () => {
    if (selectedView === 'chargingStationList') {
      return (
          <OwnerTable
              data={chargingStations}
              onEdit={handleEdit}
              onDelete={handleDelete}
          />
      );
    } else if (selectedView === 'addChargingStation') {
      return (
        <Flex align="center" justify="center" width="100%" height="100%" p={4}>
          <VStack spacing={4} width="400px" bg="white" p={4} borderRadius="md">
            <OwnerInput placeholder="충전소명" name="name" value={inputValues.name} onChange={handleInputChange} />
            <Address setAddress={handleAddressChange} />
            <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={2} width="100%">
              <Text fontSize="md" color="gray.600">
                {inputValues.address || '기본 주소'}
              </Text>
            </Box>
            <OwnerInput placeholder="상세 주소" name="detailAddress" value={inputValues.detailAddress} onChange={handleInputChange} />
            <OwnerInput placeholder="kWh당 가격" name="price" value={inputValues.price} onChange={handleInputChange} />
            <ConnectType placeholder="커넥트타입" name="connector" value={inputValues.connector} onChange={handleInputChange} />
            <OwnerInput placeholder="충전속도" name="speed" value={inputValues.speed} onChange={handleInputChange} />
            <Parking value={inputValues.parkingFee} onChange={handleParkingFeeChange} />
            <Button colorScheme="blue" onClick={handleSubmit}>
              {inputValues.statId ? '수정' : '추가'}
            </Button>
          </VStack>
        </Flex>
      );
    } else if (selectedView === 'editChargingStation') {
      return (
        <Flex align="center" justify="center" width="100%" height="100%" p={4}>
          <VStack spacing={4} width="400px" bg="white" p={4} borderRadius="md">
            <OwnerInput placeholder="충전소명" name="name" value={inputValues.name} onChange={handleInputChange} />
            <Address setAddress={handleAddressChange} />
            <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={2} width="100%">
              <Text fontSize="md" color="gray.600">
                {inputValues.address || '기본 주소'}
              </Text>
            </Box>
            <OwnerInput placeholder="상세 주소" name="detailAddress" value={inputValues.detailAddress} onChange={handleInputChange} />
            <OwnerInput placeholder="kWh당 가격" name="price" value={inputValues.price} onChange={handleInputChange} />
            <ConnectType placeholder="커넥트타입" name="connector" value={inputValues.connector} onChange={handleInputChange} />
            <OwnerInput placeholder="충전속도" name="speed" value={inputValues.speed} onChange={handleInputChange} />
            <Parking value={inputValues.parkingFee} onChange={handleParkingFeeChange} />
            <Button colorScheme="blue" onClick={handleSubmit}>
              수정
            </Button>
          </VStack>
        </Flex>
      );
    } else {
      return <Box></Box>;
    }
  };

  return (
      <Box minH="100vh">
        <Header />
        <Tabs
            isFitted
            variant='enclosed'
            onChange={(index) => {
              if (index === 1) {
                setSelectedView('addChargingStation');
              } else if (index === 2) {
                setSelectedView('editChargingStation');
              } else if (index === 3) {
                setSelectedView('uploadCertificates');
              } else {
                setSelectedView('chargingStationList');
              }
            }}
        >
          <TabList mb='1em'>
            <Tab>충전소 목록</Tab>
            <Tab>충전소 추가</Tab>
            <Tab>충전소 수정</Tab>
            <Tab>사업자 인증</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {selectedView === 'chargingStationList' && renderContent()}
            </TabPanel>
            <TabPanel>
              {selectedView === 'addChargingStation' && renderContent()}
            </TabPanel>
            <TabPanel>
              {selectedView === 'editChargingStation' && renderContent()}
            </TabPanel>
            <TabPanel>
              {selectedView === 'uploadCertificates' && <UploadCertificates />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  );
};

export default Owner;