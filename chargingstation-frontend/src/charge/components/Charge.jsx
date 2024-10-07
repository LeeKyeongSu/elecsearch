import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text, VStack, HStack, Badge, Link } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const Charge = ({ setCurrentView, setSelectedStatId, chargerData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(chargerData.length / ITEMS_PER_PAGE);

  // 현재 페이지에 표시될 데이터
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = chargerData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box>
      {paginatedData.length > 0 ? (
        paginatedData.map((data) => (
          <Box
            onClick={() => navigate(`/charge/place/${data.statId}`)}
            key={data.statId}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            width="auto"
            boxShadow="md"
            bg="white"
            mb={4}
          >
            <VStack align="start" spacing={3}>
              <Badge colorScheme="gray" variant="solid">{data.busiNm}</Badge>
              <Link

                fontSize="xl"
                fontWeight="bold"
                cursor="pointer"
              >
                {data.statNm}
              </Link>
              <Button width="100%" colorScheme="gray" variant="outline">
                <HStack justify="space-between" width="100%">
                  <Text>{data.output || '정보 없음'}kW | {data.chargingFee || '가격 정보 없음 '}원/kWh</Text>
                </HStack>
              </Button>
            </VStack>
          </Box>
        ))
      ) : (
        <Text>충전소 데이터가 없습니다.</Text>
      )}

      <HStack spacing={4} justify="center" mt={4}>
        <Button
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          isDisabled={currentPage === 1}
          leftIcon={<ArrowLeftIcon />}
        >
        </Button>
        <Text>
          {currentPage} / {totalPages}
        </Text>
        <Button
          onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
          isDisabled={currentPage === totalPages}
          rightIcon={<ArrowRightIcon />}
        >
        </Button>
      </HStack>
    </Box>
  );
};

export default Charge;