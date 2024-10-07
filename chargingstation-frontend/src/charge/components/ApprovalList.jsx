import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, Link } from '@chakra-ui/react';
import axiosInstance from "../../api/axios.js";

const ApprovalList = () => {
  const [data, setData] = useState([]);
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    // 예시로 localStorage에서 ownerId를 가져오는 로직
    const user = JSON.parse(localStorage.getItem('user')); // localStorage에서 user 정보 가져오기
    const ownerIdFromUser = user?.ownerId;

    if (ownerIdFromUser) {
      setOwnerId(ownerIdFromUser); // ownerId 설정
    }
  }, []);

  useEffect(() => {
    if (ownerId) {  // ownerId가 존재할 경우에만 API 호출
      axiosInstance.get(`/api/approval-requests/${ownerId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('승인 요청 목록을 가져오는 중 오류가 발생했습니다:', error);
      });
    }
  }, [ownerId]);

  const handleApprove = (requestId) => {
    axiosInstance.post(`/api/approval-requests/approve/${requestId}`)
    .then((response) => {
      setData(data.map(item => item.requestId === requestId ? response.data : item));
    })
    .catch((error) => {
      console.error('승인 처리 중 오류가 발생했습니다:', error);
    });
  };

  const handleReject = (requestId) => {
    axiosInstance.post(`/api/approval-requests/reject/${requestId}`)
    .then((response) => {
      setData(data.map(item => item.requestId === requestId ? response.data : item));
    })
    .catch((error) => {
      console.error('거절 처리 중 오류가 발생했습니다:', error);
    });
  };

  return (
      <Box p={5}>
        <Heading mb={5}>승인 요청 목록</Heading>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>사업자 이름</Th>
              <Th>요청 ID</Th>
              <Th>요청 날짜</Th>
              <Th>상태</Th>
              <Th>사업자 증명서</Th>
              <Th>신청 증명서</Th>
              <Th>승인</Th>
              <Th>거절</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => (
                <Tr key={row.requestId}>
                  <Td>{row.businessOwner.businessName}</Td>
                  <Td>{row.requestId}</Td>
                  <Td>{row.timestamp}</Td>
                  <Td>{row.status}</Td>
                  <Td>
                    <Link href={row.businessCertificatePath} color="blue.500" isExternal>
                      다운로드
                    </Link>
                  </Td>
                  <Td>
                    <Link href={row.identityProofPath} color="blue.500" isExternal>
                      다운로드
                    </Link>
                  </Td>
                  <Td>
                    <Button colorScheme="blue" onClick={() => handleApprove(row.requestId)}>승인</Button>
                  </Td>
                  <Td>
                    <Button colorScheme="gray" onClick={() => handleReject(row.requestId)}>거절</Button>
                  </Td>
                </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
  );
};

export default ApprovalList;
