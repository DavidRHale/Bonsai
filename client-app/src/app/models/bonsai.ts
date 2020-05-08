import { IJob } from './job';

export interface IBonsai {
  id: string;
  name: string;
  species: string;
  jobs?: IJob[];
}

export interface IBonsaiFormValues extends Partial<IBonsai> {}

export class BonsaiFormValues implements IBonsaiFormValues {
  id?: string = '';
  name = '';
  species = '';

  constructor(init?: IBonsaiFormValues) {
    Object.assign(this, init);
  }
}
