export interface IBonsai {
  id: string;
  name: string;
  species: string;
  age?: number;
}

export interface IBonsaiFormValues extends Partial<IBonsai> { }

export class BonsaiFormValues implements IBonsaiFormValues {
  id?: string = '';
  name = '';
  species = '';
  age?: number = undefined;

  constructor(init?: IBonsaiFormValues) {
    Object.assign(this, init);
  }
}