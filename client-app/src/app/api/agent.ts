import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { IBonsai } from '../models/bonsai';
import { history } from '../..';
import { NOT_FOUND_ROUTE } from '../layout/appRoutes';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error');
  }

  if (error.response.status === 404) {
    history.push(NOT_FOUND_ROUTE);
  }

  const { status, data, config } = error.response;
  if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
    history.push(NOT_FOUND_ROUTE);
  }

  if (status === 500) {
    toast.error('Server error')
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => (
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms))
);

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
  delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

const Bonsai = {
  list: (): Promise<IBonsai[]> => requests.get('/bonsais'),
  details: (id: string) => requests.get(`/bonsais/${id}`),
  create: (bonsai: IBonsai) => requests.post('/bonsais', bonsai),
  update: (bonsai: IBonsai) => requests.put(`/bonsais/${bonsai.id}`, bonsai),
  delete: (id: string) => requests.delete(`/bonsais/${id}`)
};

export default { Bonsai };