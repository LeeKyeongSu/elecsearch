import { useState } from 'react';
import { Box, Button, VStack, useToast, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import ChooseOne from './components/ChooseOne';
import elecsearch from '../assets/elecsearch.png';


function Join() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'option1'
  });

  const [errors, setErrors] = useState({});
  const [successMessages, setSuccessMessages] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleUserTypeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      userType: value,
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: '아이디를 입력해주세요.',
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            username: '',
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: '',
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            username: `${value}님 환영합니다!`,
          }));
        }
        break;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: '이메일을 입력해주세요.',
          }));
        } else if (!emailPattern.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: '이메일 형식으로 입력해주세요. (abc@def.ge)',
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: '',
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            email: '일렉서치는 이메일 아이디로 로그인합니다.',
          }));
        }
        break;
      case 'password':
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: '비밀번호를 입력해주세요.',
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            password: '',
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: '',
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            password: '아래에 비밀번호를 다시 한번 입력해주세요.',
          }));
        }
        break;
      case 'confirmPassword':
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: '비밀번호를 다시 확인해주세요.',
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            confirmPassword: '',
          }));
        } else if (value !== formData.password) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: '비밀번호를 다시 확인해주세요.',
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            confirmPassword: '',
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: '',
          }));
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            confirmPassword: '비밀번호를 확인했습니다.',
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAllFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userDto = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
      address: formData.address || null,
      phoneNumber: formData.phoneNumber || null,
      connectorType: formData.connectType || null,
      isAdmin: false
    };

    try {
      const response = await fetch('http://34.47.120.150:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDto),
      });

      if (!response.ok) {
        throw new Error('회원가입 실패');
      }

      toast({
        title: '회원가입이 완료되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: '회원가입 중 오류가 발생했습니다.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const validateAllFields = () => {
    const errors = {};
    if (!formData.username) errors.username = '아이디를 입력해주세요.';
    if (!formData.email) errors.email = '이메일을 입력해주세요.';
    if (!formData.password) errors.password = '비밀번호를 입력해주세요.';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = '비밀번호를 다시 확인해주세요.';
    return errors;
  };

  return (
      <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
          bg="white"
          as="form"
          onSubmit={handleSubmit}
      >
        <VStack spacing={4} width="400px">
          <Image src={elecsearch} alt="Electric Search" objectFit="cover"/>
          <UserInput
              placeholder="아이디"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              errorMessage={errors.username}
              successMessage={successMessages.username}
          />
          <UserInput
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              successMessage={successMessages.email}
          />
          <PasswordInput
              placeholder="비밀번호"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              successMessage={successMessages.password}
          />
          <PasswordInput
              placeholder="비밀번호 확인"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              successMessage={successMessages.confirmPassword}
          />
          <ChooseOne value={formData.userType} onChange={handleUserTypeChange} />
          <br />
          <Button colorScheme="green" width="100%" type="submit">
            회원가입
          </Button>
        </VStack>
      </Box>
  );
}

export default Join;
