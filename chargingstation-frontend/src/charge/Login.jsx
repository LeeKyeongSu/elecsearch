import { useState } from 'react';
import { Box, Button, VStack, Text, Image, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import elecsearch from '../assets/elecsearch.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://34.47.120.150:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            const data = await response.json();
            if (response.ok) {
                // 로그인 성공 처리
                console.log(data.accessToken);
                document.cookie = `accessToken=${data.accessToken}; path=/;`;
                toast({
                    title: '로그인 성공',
                    description: '로그인되었습니다.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/'); // 홈 화면으로 리디렉션
            } else {
                toast({
                    title: '로그인 실패',
                    description: data.error || '로그인에 실패했습니다.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('로그인 처리 중 오류 발생:', error);
            toast({
                title: '오류 발생',
                description: '로그인 처리 중 오류가 발생했습니다.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            bg="white"
        >
            <VStack spacing={4} width="400px">
                <Image src={elecsearch} alt="Electric Search" objectFit="cover" />
                <UserInput placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordInput placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button colorScheme="blue" width="100%" onClick={handleLogin}>로그인</Button>
                <br />
                <Text mt={4}>일렉서치와 함께 하세요!</Text>
                <Button as={Link} to="/join" colorScheme="green" width="100%">회원가입</Button>
            </VStack>
        </Box>
    );
}

export default Login;
