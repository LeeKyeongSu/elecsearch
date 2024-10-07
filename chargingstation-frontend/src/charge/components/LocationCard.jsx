import { useState } from 'react';
import { Box, Button, SimpleGrid, Tag, IconButton, Divider, Heading } from '@chakra-ui/react';
import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const LocationCard = ({ onClose }) => {
  const tags = {
    '공공시설': 'A0',
    '주차시설': 'B0',
    '휴게시설': 'C0',
    '관광시설': 'D0',
    '상업시설': 'E0',
    '차량정비시설': 'F0',
    '기타시설': 'G0',
    '공동주택시설': 'H0',
    '근린생활시설': 'I0',
    '교육문화시설': 'J0'
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 태그 클릭 시 선택/해제 처리 함수
  const handleTagClick = (tag) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  // 초기화 함수
  const handleReset = () => {
    setSelectedTags([]);
  };

  // 적용 버튼 클릭 시 URL을 업데이트하는 함수
  const handleApply = () => {
    const currentParams = new URLSearchParams(location.search);

    // 선택된 태그를 코드 값으로 변환
    const selectedValues = selectedTags.map(tag => tags[tag]);

    if (selectedValues.length > 0) {
      currentParams.set('kind', selectedValues.join(','));
    } else {
      currentParams.delete('kind');
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
          장소
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
        {Object.keys(tags).map((tag) => (
          <Tag
            key={tags[tag]}
            size="lg"
            variant="solid"
            bg={selectedTags.includes(tag) ? 'teal.500' : 'gray.100'}
            color={selectedTags.includes(tag) ? 'white' : 'black'}
            textAlign="center"
            justifyContent="center"
            p={2}
            cursor="pointer"
            onClick={() => handleTagClick(tag)} // 클릭 시 태그 선택/해제
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

export default LocationCard;