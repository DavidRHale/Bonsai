import { createContext, useContext } from 'react';
import { configure } from 'mobx';

import BonsaiStore from './bonsaiStore';
import UserStore from './userStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import { JobStore } from './jobStore'; // TODO update other stores to not use default exports

configure({ enforceActions: 'always' });

export class RootStore {
  bonsaiStore: BonsaiStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  jobStore: JobStore;

  constructor() {
    this.bonsaiStore = new BonsaiStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.jobStore = new JobStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
export const useRootStoreContext = () => useContext(RootStoreContext);
