import { useState } from 'react';
import { Box, Button, SimpleGrid, Tag, IconButton, Divider, Heading } from '@chakra-ui/react';
import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const ParkingCard = ({ onClose }) => {
  const tags = ['무료', '유료'];
  const [selectedTag, setSelectedTag] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 태그 클릭 시 선택 처리 함수
  const handleTagClick = (tag) => {
    setSelectedTag(prevTag => prevTag === tag ? null : tag);
  };

  // 초기화 함수
  const handleReset = () => {
    setSelectedTag(null);
  };

  // 적용 버튼 클릭 시 URL을 업데이트하는 함수
  const handleApply = () => {
    const currentParams = new URLSearchParams(location.search);

    // 선택된 태그를 파라미터 값으로 변환
    const parkingFree = selectedTag === '무료' ? 'Y' : selectedTag === '유료' ? 'N' : undefined;

    if (parkingFree !== undefined) {
      currentParams.set('parkingFree', parkingFree);
    } else {
      currentParams.delete('parkingFree');
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
      margin="auto"
      bg="white"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Heading as="h3" size="md">
          주차요금
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

      {/* Tags Grid */}
      <SimpleGrid columns={3} spacing={2} mb={4} mt={4}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            size="lg"
            variant="solid"
            bg={selectedTag === tag ? 'teal.500' : 'gray.100'}
            color={selectedTag === tag ? 'white' : 'black'}
            textAlign="center"
            justifyContent="center"
            p={2}
            cursor="pointer"
            onClick={() => handleTagClick(tag)} // 클릭 시 태그 선택
          >
            {tag}
          </Tag>
        ))}
      </SimpleGrid>
      <Divider />

      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={handleReset} // 초기화 버튼 클릭 시 초기화 처리
          leftIcon={<RepeatIcon />}
          mr={2}
        >
          초기화
        </Button>
        <Button colorScheme="blue" onClick={handleApply}>
          적용
        </Button>
      </Box>
    </Box>
  );
};

export default ParkingCard;