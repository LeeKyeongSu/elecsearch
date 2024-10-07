import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://34.47.120.150:8080', // 서버의 IP 주소로 변경
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
