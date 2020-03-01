import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { LIST_BONSAI_ROUTE } from "../layout/appRoutes";

import { history } from '../..';

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() { return !!this.user }

  @action login = async (userFormValues: IUserFormValues) => {
    try {
      const user = await agent.User.login(userFormValues);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push(LIST_BONSAI_ROUTE);
    } catch (error) {
      throw error;
    }
  }

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  }

  @action register = async (userFormValues: IUserFormValues) => {
    try {
      const user = await agent.User.register(userFormValues);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push(LIST_BONSAI_ROUTE);
    } catch (error) {
      throw error;
    }
  }

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error)
    }
  }
}