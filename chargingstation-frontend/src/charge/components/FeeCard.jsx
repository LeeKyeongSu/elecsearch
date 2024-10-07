import { Box, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, IconButton, Divider, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FeeCard = ({ onClose }) => {
  const [value, setValue] = useState(7); // 슬라이더의 초기값을 7로 설정
  const navigate = useNavigate();
  const location = useLocation();

  // 적용 버튼 클릭 시 URL을 업데이트하는 함수
  const handleApply = () => {
    const currentParams = new URLSearchParams(location.search);

    // 슬라이더 값을 100의 배수로 변환
    const fee = value === 7 ? undefined : value * 100;

    if (fee !== undefined) {
      currentParams.set('chargingFee', fee.toString());
    } else {
      currentParams.delete('chargingFee');
    }

    navigate(`${location.pathname}?${currentParams.toString()}`);
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      width="400px"
      bg="white"
    >
      {/* Header with title and close icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Heading as="h3" size="md">
          충전요금(kWh)
        </Heading>
        <IconButton
          icon={<CloseIcon />}
          variant="ghost"
          size="sm"
          aria-label="Close"
          onClick={onClose}
        />
      </Box>
      <Divider />

      {/* Slider with labels */}
      <Box mt={4} p={4} pt={6}>
        <Box mb={2} textAlign="center"> {/* 슬라이더 위에 텍스트 표시 */}
          <Text fontSize='lg' fontWeight='bold'>
            {value === 0 ? '무료' : value === 7 ? '전체' : `${value * 100}원`}
          </Text>
        </Box>
        <Slider
          aria-label='slider-ex-1'
          min={0}
          max={7}
          step={1}
          value={value}
          onChange={(val) => setValue(val)} // 슬라이더 값이 변경될 때 상태 업데이트
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
      <Divider />

      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button colorScheme="blue" onClick={handleApply}>
          적용
        </Button>
      </Box>
    </Box>
  );
};

export default FeeCard;
