import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { IBonsai, IBonsaiEnvelope } from '../models/bonsai';
import { history } from '../..';
import { NOT_FOUND_ROUTE } from '../layout/appRoutes';
import { IUser, IUserFormValues } from '../models/user';
import { IJob } from '../models/job';
import { IPhoto } from '../models/photo';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(undefined, (error) => {
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
        toast.error('Server error');
    }

    throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
    postForm: (url: string, formData: FormData) => {
        return axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(responseBody);
    },
};

const Bonsai = {
    list: (limit?: number, page?: number): Promise<IBonsaiEnvelope> =>
        requests.get(`/bonsais?limit=${limit}&offset=${page ? page * limit! : 0}`), // TODO this function should take the offset not the page
    details: (id: string) => requests.get(`/bonsais/${id}`),
    create: (bonsai: IBonsai) => requests.post('/bonsais', bonsai),
    update: (bonsai: IBonsai) => requests.put(`/bonsais/${bonsai.id}`, bonsai),
    delete: (id: string) => requests.delete(`/bonsais/${id}`),
    uploadPhoto: (photo: Blob, bonsaiId: string): Promise<IPhoto> => {
        const formData = new FormData();
        formData.append('File', photo);
        formData.append('BonsaiId', bonsaiId);

        return requests.postForm(`/photos`, formData);
    },
    deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
};

const Job = {
    create: (job: IJob) => requests.post('/jobs', job),
};

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user),
};

export default { Bonsai, Job, User };
