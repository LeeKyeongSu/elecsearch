import { useState } from 'react';
import { Box, Button, SimpleGrid, Tag, IconButton, Divider, Heading } from '@chakra-ui/react';
import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';

// 태그와 ID 매핑을 위한 객체
const tagToId = {
  '환경부': '1',
  '아우토크립트': '2',
  '아하(주)': '3',
  '아마노코리아': '4',
  '부안군': '5',
  '브라이트에너지파트너스': '6',
  '비케이에너지': '7',
  '블루네트웍스': '8',
  '차밥스': '9',
  '보스시큐리티(주)': '10',
  '보타리에너지(주)': '11',
  '씨에스테크놀로지(주)': '12',
  '코콤': '13',
  '서울씨엔지(서울이브이)': '14',
  '채움모빌리티': '15',
  '쿨사인 주식회사': '16',
  '캐스트프로': '17',
  '크로커스': '18',
  '한국EV충전서비스센터': '19',
  '씨어스': '20',
  '채비': '21',
  '대구환경공단': '22',
  '딜라이브': '24',
  '대유플러스': '25',
  '두루스코이브이': '26',
  '대선': '27',
  '동양이엔피': '28',
  '에바': '29',
  '이지차저': '30',
  '이앤에이치에너지': '31',
  '이노케이텍': '32',
  '엔라이튼': '33',
  'evmost': '34',
  '이엔': '35',
  'E1': '36',
  '이카플러그': '37',
  '이엘일렉트릭': '38',
  '이씨티': '39',
  '에버온': '40',
  '차지인': '41',
  '유한회사 골드에너지': '42',
  '그리드위즈': '43',
  'GS칼텍스': '44',
  '현대자동차': '45',
  '한국전기차충전서비스': '46',
  '휴맥스이브이': '47',
  '해피차지': '48',
  '한국홈충전기렌탈': '49',
  '한화솔루션': '50',
  '현대엔지니어링': '51',
  '인천국제공항': '52',
  '익산시': '53',
  '아이마켓코리아': '54',
  '신세계아이앤씨': '55',
  '아이온커뮤니케이션즈': '56',
  '인큐버스': '57',
  '이브이시스': '58',
  '제주에너지공사': '59',
  '제주도청': '60',
  '제주전기자동차서비스': '61',
  '전주시': '62',
  '제주테크노파크': '63',
  '정읍시': '64',
  '한국컴퓨터': '65',
  '한국전기차인프라기술': '66',
  'KH에너지(주)': '67',
  '김해시': '68',
  '순천시': '69',
  '클린일렉스': '70',
  '카카오모빌리티': '71',
  '이브이파트너스': '72',
  '한국전력': '73',
  '이브이씨원': '74',
  '한국전기차솔루션': '75',
  'L3일렉트릭파워': '76',
  '롯데건설': '77',
  '롯데이노베이트': '78',
  'LG유플러스(헬로비전)': '79',
  '엘에스이링크': '80',
  'LG유플러스': '81',
  '매니지온': '82',
  '미래SD': '83',
  '모던텍': '84',
  '남부솔루션': '85',
  '농협경제지주 신재생에너지센터': '87',
  '나주시': '88',
  '이브이네스트': '89',
  '뉴텍솔루션(주)': '90',
  '한국전자금융': '91',
  '넥씽': '92',
  '현대오일뱅크': '93',
  '파킹클라우드': '94',
  'GS차지비': '95',
  '펌프킨': '96',
  '플러그링크': '97',
  '피라인모터스': '98',
  '이브이파킹서비스': '99',
  '파워큐브(SP)': '100',
  '레드이엔지': '101',
  '이브이에스이피': '102'
};

const CompanyCard = ({ onClose }) => {
  const tags = Object.keys(tagToId);
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

    // 선택된 태그를 ID로 변환
    const selectedValues = selectedTags.map(tag => tagToId[tag]).filter(id => id !== undefined);

    if (selectedValues.length > 0) {
      currentParams.set('ownerIds', selectedValues.join(','));
    } else {
      currentParams.delete('ownerIds');
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
      {/* Header with title and close icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Heading as="h3" size="md">
          사업자
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

      {/* Tags Grid with scrollable container */}
      <Box maxHeight="200px" overflowY="auto">
        <SimpleGrid columns={3} spacing={2} mb={4} mt={4}>
          {tags.map((tag) => (
            <Tag
              key={tag}
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
      </Box>
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

export default CompanyCard;
