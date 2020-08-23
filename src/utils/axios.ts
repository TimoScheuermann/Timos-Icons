import Axios from 'axios';
import { getToken } from 'timos-accounts/dist/jwt-helper';

export const axios = Axios.create({
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  baseURL: 'https://api.timos.design/icons/'
});
