export interface IBonsai {
  id: string;
  name: string;
  species: string;
}

export interface IBonsaiFormValues extends Partial<IBonsai> { }

export class BonsaiFormValues implements IBonsaiFormValues {
  id?: string = '';
  name = '';
  species = '';

  constructor(init?: IBonsaiFormValues) {
    Object.assign(this, init);
  }
}