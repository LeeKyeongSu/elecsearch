import { useState, useEffect } from 'react';
import { Flex, HStack, Button, Image } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import elecsearch from '../../assets/elecsearch.png';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [userType, setUserType] = useState('user');  // 'user' 또는 'owner'
  const navigate = useNavigate();

  //const useEffect(() => {
  //  fetchUserData().then(data => setUserType(data.userType));
  //}, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
      const token = getCookie('accessToken');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);


  const handleLogout = async () => {
    try {
      const token = getCookie('accessToken');
      const response = await fetch('http://34.47.120.150:8080/users/logout', {
        method: 'POST', // 또는 'GET' 등 백엔드에 맞는 HTTP 메서드 사용
        credentials: 'include', // 쿠키를 포함해서 보낼 경우
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
      // 쿠키에서 accessToken 삭제
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  const handleLoginClick = () => {
      navigate('/login');
    };

  return (
    <Flex
      bg="white"
      p={4}
      borderBottom="1px solid #e2e8f0"
      align="center"
      justify="space-between"
      width="100%"
      zIndex={1}
      height="70px"
    >
      <Link to="/">
      <Image src={elecsearch} alt="Electric Search" objectFit="contain" maxHeight="70px"/>
      </Link>
      <HStack spacing={4}>
        {isLoggedIn ? (
          <>
          {/*
            {userType === 'owner' && (
              <Button as={Link} to="/owner" colorScheme="yellow" variant="outline">
                충전소관리
              </Button>
            )}
              */}
            <Button as={Link} to="/mypage" colorScheme="purple" variant="outline">
              마이페이지
            </Button>
            <Button onClick={handleLogout} colorScheme="gray" variant="outline">
              로그아웃
            </Button>
          </>
        ) : (
          <Button as={Link} to="/login" colorScheme="blue" variant="outline">
            로그인
          </Button>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;
