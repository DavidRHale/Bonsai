import { createContext, useContext } from 'react';
import { configure } from 'mobx';

import BonsaiStore from './bonsaiStore';
import UserStore from './userStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';

configure({ enforceActions: 'always' });

export class RootStore {
  bonsaiStore: BonsaiStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.bonsaiStore = new BonsaiStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
export const useRootStoreContext = () => useContext(RootStoreContext);
