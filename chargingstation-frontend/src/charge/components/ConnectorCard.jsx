import { useState } from 'react';
import { Box, Button, SimpleGrid, Tag, IconButton, Divider, Heading } from '@chakra-ui/react';
import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const ConnectorCard = ({ onClose }) => {
  const tags = [
    { name: 'AC3상', value: '07' },
    { name: 'AC완속', value: '02' },
    { name: 'DC콤보', value: '04' },
    { name: 'DC콤보(완속)', value: '08' },
    { name: 'DC차데모', value: '01' },
    { name: 'DC차데모+AC3상', value: '03' },
    { name: 'DC차데모+DC콤보', value: '05' },
    { name: 'DC차데모+AC3상+DC콤보', value: '06' },
  ];

  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

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
      // 현재 URL의 쿼리 파라미터 가져오기
      const currentParams = new URLSearchParams(location.search);

      // 선택된 태그를 숫자로 변환
      const selectedValues = tags
        .filter(tag => selectedTags.includes(tag.name))
        .map(tag => tag.value);

      // 기존 파라미터에 추가
      if (selectedValues.length > 0) {
        currentParams.set('chgerType', selectedValues.join(','));
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
          커넥터
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
            key={tag.value}
            size="lg"
            variant="solid"
            bg={selectedTags.includes(tag.name) ? 'teal.500' : 'gray.100'}
            color={selectedTags.includes(tag.name) ? 'white' : 'black'}
            textAlign="center"
            justifyContent="center"
            p={2}
            cursor="pointer"
            onClick={() => handleTagClick(tag.name)} // 클릭 시 태그 선택/해제
          >
            {tag.name}
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

export default ConnectorCard;
