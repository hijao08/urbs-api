import axios from 'axios';

const baseURL = process.env.EXTERNAL_API_BASE_URL || 'https://httpbin.org';

export const http = axios.create({
  baseURL,
  timeout: 15000,
});
