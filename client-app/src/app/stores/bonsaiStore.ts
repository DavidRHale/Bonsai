import { observable, action, runInAction, computed } from 'mobx';

import { IBonsai } from '../models/bonsai';
import agent from '../api/agent';
import { SyntheticEvent } from 'react';
import { detailBonsaiRoute } from '../layout/appRoutes';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { IJob } from '../models/job';
import { IPhoto } from '../models/photo';

const LIMIT = 2;

export default class BonsaiStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable bonsaiRegistry = new Map();
    @observable bonsai: IBonsai | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable uploadingPhoto = false;
    @observable deletingPhoto = false;
    @observable bonsaiCount = 0;
    @observable page = 0;

    @computed get totalPages() {
        return Math.ceil(this.bonsaiCount / LIMIT);
    }

    @action setPage = (page: number) => {
        this.page = page;
    };

    @computed get allBonsais() {
        return Array.from(this.bonsaiRegistry.values());
    }

    @action loadBonsais = async () => {
        this.loadingInitial = true;

        try {
            const { bonsais, bonsaiCount } = await agent.Bonsai.list(LIMIT, this.page);

            runInAction('load bonsais', () => {
                bonsais.forEach((bonsai) => {
                    this.bonsaiRegistry.set(bonsai.id, bonsai);
                });
                this.bonsaiCount = bonsaiCount;
                this.loadingInitial = false;
            });
        } catch (error) {
            console.log(error);
            runInAction('load bonsais error', () => {
                this.loadingInitial = false;
            });
        }
    };

    @action loadBonsai = async (id: string) => {
        let bonsai = this.getBonsai(id);

        if (bonsai) {
            this.bonsai = bonsai;
            return bonsai; // return non-observable to prevent excessive calls of useEffect
        } else {
            this.loadingInitial = true;

            try {
                bonsai = await agent.Bonsai.details(id);
                runInAction('load bonsai', () => {
                    this.bonsai = bonsai;
                    this.loadingInitial = false;
                });
                return bonsai; // return non-observable to prevent excessive calls of useEffect
            } catch (error) {
                runInAction('load bonsai error', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    };

    getBonsai = (id: string) => {
        return this.bonsaiRegistry.get(id);
    };

    @action clearBonsai = () => {
        this.bonsai = null;
    };

    @action clearBonsais = () => {
        this.bonsaiRegistry = new Map();
    };

    @action selectBonsai = (id: string) => {
        this.bonsai = this.bonsaiRegistry.get(id);
    };

    @action createBonsai = async (bonsai: IBonsai) => {
        this.submitting = true;

        try {
            await agent.Bonsai.create(bonsai);

            runInAction('create bonsai', () => {
                this.bonsaiRegistry.set(bonsai.id, bonsai);
                this.submitting = false;
            });

            history.push(detailBonsaiRoute(bonsai.id));
        } catch (error) {
            runInAction('create bonsai error', () => {
                this.submitting = false;
            });

            toast.error('Problem submitting data');
            throw error;
        }
    };

    @action editBonsai = async (bonsai: IBonsai) => {
        this.submitting = true;
        try {
            await agent.Bonsai.update(bonsai);

            runInAction('edit bonsai', () => {
                this.bonsaiRegistry.set(bonsai.id, bonsai);
                this.bonsai = bonsai;
                this.submitting = false;
            });

            history.push(detailBonsaiRoute(bonsai.id));
        } catch (error) {
            runInAction('edit bonsai error', () => {
                this.submitting = false;
            });

            toast.error('Problem submitting data');
            console.log(error);
        }
    };

    @action deleteBonsai = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Bonsai.delete(id);

            runInAction('delete bonsai', () => {
                this.bonsaiRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (error) {
            runInAction('delete bonsai error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error);
        }
    };

    @action createJob = async (job: IJob) => {
        this.submitting = true;

        try {
            await agent.Job.create(job);

            runInAction('create job', () => {
                this.submitting = false;
                this.loadBonsai(job.bonsaiId);
            });

            history.push(detailBonsaiRoute(job.bonsaiId));
        } catch (error) {
            runInAction('create job error', () => {
                this.submitting = false;
            });

            toast.error('Problem submitting data');
            console.log(error);
        }
    };

    @action uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;

        try {
            if (this.bonsai) {
                const photo = await agent.Bonsai.uploadPhoto(file, this.bonsai.id);
                runInAction(() => {
                    if (this.bonsai) {
                        if (this.bonsai.photos) {
                            this.bonsai.photos.push(photo);
                        } else {
                            this.bonsai.photos = [photo];
                        }
                    }

                    this.uploadingPhoto = false;
                });
            } else {
                toast.error('Problem uploading photo - no associated bonsai found');
                runInAction(() => {
                    this.uploadingPhoto = false;
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Problem uploading photo');
            runInAction(() => {
                this.uploadingPhoto = false;
            });
        }
    };

    @action deletePhoto = async (photo: IPhoto) => {
        this.deletingPhoto = true;
        try {
            await agent.Bonsai.deletePhoto(photo.id);
            runInAction(() => {
                this.bonsai!.photos = this.bonsai!.photos!.filter((p) => p.id !== photo.id);
                this.deletingPhoto = false;
            });
        } catch (error) {
            console.log(error);
            toast.error('Problem deleting photo');
            runInAction(() => (this.deletingPhoto = true));
        }
    };
}
