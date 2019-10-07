import axios, { AxiosResponse } from 'axios';

import { IBonsai } from '../models/bonsai';

axios.defaults.baseURL = 'http://localhost:5000/api';

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