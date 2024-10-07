import { Button, Table, Tbody, Td, Th, Thead, Tr, Box } from '@chakra-ui/react';

const OwnerTable = ({ data, onEdit, onDelete }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>충전소 이름</Th>
          <Th>주소</Th>
          <Th>커넥터 유형</Th>
          <Th>슬롯 수</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.statId}>
            <Td>{item.statNm}</Td>
            <Td isTruncated maxWidth="300px">
              {item.address}
            </Td>
            <Td>{item.connector}</Td>
            <Td>{item.slot}</Td>
            <Td>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Button colorScheme="yellow" size="sm" onClick={() => onEdit(item)}>
                  수정
                </Button>
                <Button colorScheme="red" size="sm" ml={2} onClick={() => onDelete(item)}>
                  삭제
                </Button>
              </Box>
            </Td>
          </Tr>
          ))}
        </Tbody>
      </Table>
  );
};

export default OwnerTable;