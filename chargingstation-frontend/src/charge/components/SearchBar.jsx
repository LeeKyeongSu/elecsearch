import React, { useState, useEffect } from 'react';
import { Box, Input, List, ListItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // 목록 표시 상태
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`http://34.47.120.150:8080/charger/search?searchTerm=${searchTerm}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) throw new Error('네트워크 오류');
          const data = await response.json();
          setSearchResults(data);
          setShowResults(true); // 결과를 표시
        } catch (error) {
          console.error('검색 오류:', error);
          setSearchResults([]);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
      setShowResults(false); // 검색어가 없으면 목록 숨기기
    }
  }, [searchTerm]);

  const handleResultClick = (statId) => {
    // 결과 클릭 시 세부 페이지로 이동
    navigate(`/charge/place/${statId}`);
    setSearchTerm(''); // 검색어 초기화
    setSearchResults([]); // 검색 결과 숨기기
    setShowResults(false); // 목록 숨기기
  };

  return (
    <Box
      p={4}
      width="400px"
      bg="white"
      borderRadius="md"
      position="absolute"
      top="10px"
      right="10px"
      zIndex={2}
    >
      <Input
        placeholder="충전소 검색"
        size="lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {showResults && searchResults.length > 0 && (
        <List spacing={3} mt={2} borderWidth="1px" borderRadius="md" bg="white" boxShadow="md">
          {searchResults.map((result) => (
            <ListItem
              key={result.statId}
              p={2}
              cursor="pointer"
              _hover={{ bg: 'gray.100' }}
              onClick={() => handleResultClick(result.statId)}
            >
              <Text>{result.statNm}</Text>
              <Text fontSize="sm" color="gray.500">{result.addr}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;