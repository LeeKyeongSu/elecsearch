import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Text, VStack, HStack, Badge, Divider } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import ReviewRead from './ReviewRead';

const ChargeDetail = ({ setSelectedCharger }) => {
  const [chargerDetail, setChargerDetail] = useState({});
  const navigate = useNavigate();
  const { statId } = useParams();
  

  useEffect(() => {
    const fetchChargerDetail = async () => {
      try {
        const response = await fetch(`http://34.47.120.150:8080/charger/place/${statId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('네트워크 연결이 원활하지 않습니다.');
        const data = await response.json();
        setChargerDetail(data);
        setSelectedCharger({ lat: data.lat, lng: data.lng, statNm: data.statNm }); // Update map view
      } catch (error) {
        console.error('세부정보 가져오기 오류:', error);
      }
    };
  
    fetchChargerDetail();
  }, [statId, setSelectedCharger]);
  
  

  const getStatusText = (status) => {
    const statusNumber = parseInt(status, 10);
    switch (statusNumber) {
      case 1: return '통신이상';
      case 2: return '충전대기';
      case 3: return '충전중';
      case 4: return '운영중지';
      case 5: return '점검중';
      case 9: return '상태미확인';
      default: return '알 수 없는 상태';
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      width="auto"
      boxShadow="md"
      bg="white"
    >
      <VStack align="start" spacing={3}>
        <Badge colorScheme="gray" variant="solid">{chargerDetail.busiNm || '정보 없음'}</Badge>
        <Text fontSize="xl" fontWeight="bold">{chargerDetail.statNm || '정보 없음'}</Text>
        <Text fontSize="sm" color="gray.500">{chargerDetail.addr || '주소 정보 없음'}</Text>
        <Button width="100%" colorScheme="gray" variant="outline">
          <HStack justify="left" width="100%">
            <Text textAlign="left">충전속도 : {chargerDetail.output || '정보 없음'}kW</Text>
          </HStack>
        </Button>
        <Button width="100%" colorScheme="gray" variant="outline">
          <HStack justify="left" width="100%">
            <Text textAlign="left">충전요금 : {chargerDetail.chargingFee || '가격 정보 없음 '}(원/kWh)</Text>
          </HStack>
        </Button>
        <Button width="100%" colorScheme="gray" variant="outline">
          <HStack justify="left" width="100%">
            <Text textAlign="left">{getStatusText(chargerDetail.stat) || '상태 정보 없음'}</Text>
          </HStack>
        </Button>
        <Button width="100%" colorScheme="gray" variant="outline">
          <HStack justify="left" width="100%">
            <Text textAlign="left">연락처 : {chargerDetail.busiCall}</Text>
          </HStack>
        </Button>
        <Divider />
        <ReviewRead />
        <Button onClick={() => navigate('/')} leftIcon={<ChevronLeftIcon />}>뒤로</Button>
      </VStack>
    </Box>
  );
};

export default ChargeDetail;
