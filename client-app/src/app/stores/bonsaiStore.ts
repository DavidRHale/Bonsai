import { observable, action, configure, runInAction } from 'mobx';

import { IBonsai } from '../models/bonsai';
import agent from '../api/agent';

configure({ enforceActions: 'always' });

class BonsaiStore {
  @observable bonsaiRegistry = new Map();
  @observable bonsai: IBonsai | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  // @observable target = '';

  @action loadBonsais = async () => {
    this.loadingInitial = true;

    try {
      const bonsais = await agent.Bonsai.list();

      runInAction('load bonsais', () => {
        bonsais.forEach(bonsai => {
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
  }

  @action loadBonsai = async (id: string) => {
    let bonsai = this.getBonsai(id);

    if (bonsai) {
      this.bonsai = bonsai;
    } else {
      this.loadingInitial = true;

      try {
        bonsai = await agent.Bonsai.details(id);
        runInAction('load bonsai', () => {
          this.bonsai = bonsai;
          this.loadingInitial = false;
        });
      } catch (error) {
        console.log(error);
        runInAction('load bonsai error', () => {
          this.loadingInitial = false;
        });
      }
    }

  }

  getBonsai = (id: string) => {
    return this.bonsaiRegistry.get(id);
  }

  @action clearBonsai = () => {
    this.bonsai = null;
  }
}