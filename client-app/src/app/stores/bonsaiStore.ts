import { observable, action, runInAction, computed } from 'mobx';

import { IBonsai } from '../models/bonsai';
import agent from '../api/agent';
import { SyntheticEvent } from 'react';
import { detailBonsaiRoute } from '../layout/appRoutes';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

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

  @computed get allBonsais() {
    return Array.from(this.bonsaiRegistry.values());
  }

  @action loadBonsais = async () => {
    this.loadingInitial = true;

    try {
      const bonsais = await agent.Bonsai.list();

      runInAction('load bonsais', () => {
        bonsais.forEach((bonsai) => {
          this.bonsaiRegistry.set(bonsai.id, bonsai);
        });
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
      console.log(error.response);
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
}
