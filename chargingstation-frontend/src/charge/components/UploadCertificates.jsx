import { useState } from 'react';
import { Box, Button, Stack, FormControl, FormLabel, Text, Input } from '@chakra-ui/react';
import axios from 'axios';

const UploadCertificates = () => {
  const [businessCertificate, setBusinessCertificate] = useState(null);
  const [identityProof, setIdentityProof] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleBusinessCertificateChange = (event) => {
    setBusinessCertificate(event.target.files[0]);
  };

  const handleIdentityProofChange = (event) => {
    setIdentityProof(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!businessCertificate || !identityProof) {
      alert('모든 파일을 업로드해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('ownerId', 1); // 실제 ownerId로 대체해야 합니다.
    formData.append('businessCertificate', businessCertificate);
    formData.append('identityProof', identityProof);

    try {
      setUploading(true);
      const response = await axios.post('http://34.47.120.150:8080/api/approval-requests', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('업로드 성공:', response.data);
      alert('파일이 성공적으로 업로드되었습니다.');
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box maxW="400" mx="auto">
      <Text fontSize="28px" fontWeight="bold">사업자 증명서 및 신분증 업로드</Text>
      <br />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <br />
          <FormControl isRequired>
            <FormLabel>사업자 증명서</FormLabel>
            <Button
              colorScheme="purple"
              onClick={() => document.getElementById('businessCertificateInput').click()}
            >
              {businessCertificate ? businessCertificate.name : '사업자 증명서 선택'}
            </Button>
            <Input
              id="businessCertificateInput"
              type="file"
              onChange={handleBusinessCertificateChange}
              display="none"
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>신분증 증명서</FormLabel>
            <Button
              colorScheme="purple"
              onClick={() => document.getElementById('identityProofInput').click()}
            >
              {identityProof ? identityProof.name : '신분증 증명서 선택'}
            </Button>
            <Input
              id="identityProofInput"
              type="file"
              onChange={handleIdentityProofChange}
              display="none"
            />
          </FormControl>
          <br />
          <Button type="submit" colorScheme="blue" isLoading={uploading}>
            업로드
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UploadCertificates;