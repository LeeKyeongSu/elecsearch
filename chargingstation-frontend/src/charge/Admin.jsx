import { useState, useEffect } from 'react';
import { Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import TableList from './components/TableList';

// 샘플 데이터
// const userList = [
//   { id: 'User1', email: 'user1@example.com', connectorType: 'Type1', userType: '일반' },
//   { id: 'User2', email: 'user2@example.com', connectorType: 'Type2', userType: '사업자' }
// ];

const chargingStationList = [
  { name: 'Station1', address: 'Location1', slot: '10', connectorType: 'Type1' },
  { name: 'Station2', address: 'Location2', slot: '20', connectorType: 'Type2' }
];

const Admin = () => {
  const [selectedTable, setSelectedTable] = useState('userList');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
      const fetchUserList = async () => {
        try {
          const response = await fetch('http://34.47.120.150:8080/users/list', {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          setUserList(data);
        } catch (error) {
          console.error('Failed to fetch user list:', error);
        }
      };

      fetchUserList();
    }, []);

  const renderTable = () => {
    switch (selectedTable) {
      case 'userList':
        return (
          <TableList
            data={userList}
            caption=""
            columns={[
              { header: '아이디', accessor: 'id' },
              { header: '이메일', accessor: 'email' },
              { header: '커넥트 타입', accessor: 'connectorType' },
              { header: '유저 타입', accessor: 'userType' }
            ]}
          />
        );
      case 'chargingStationList':
        return (
          <TableList
            data={chargingStationList}
            caption=""
            columns={[
              { header: '충전소 이름', accessor: 'name' },
              { header: '주소', accessor: 'address' },
              { header: '슬롯 수', accessor: 'slot' },
              { header: '커넥트 타입', accessor: 'connectorType' }
            ]}
          />
        );
      default:
        return <Box></Box>;
    }
  };

  return (
    <Box>
      <Text textAlign="center" fontSize="2xl" fontWeight="bold" mb={4}>
        관리자페이지
      </Text>
      <Tabs
        isFitted
        variant="enclosed"
        onChange={(index) => {
          const tableNames = ['userList', 'chargingStationList'];
          setSelectedTable(tableNames[index]);
        }}
        mb={4}
      >
        <TabList>
          <Tab>일반 이용자 목록</Tab>
          <Tab>충전소 목록</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{selectedTable === 'userList' && renderTable()}</TabPanel>
          <TabPanel>{selectedTable === 'chargingStationList' && renderTable()}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Admin;
