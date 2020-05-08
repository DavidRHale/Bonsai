import { JobType } from '../enum/JobType';

export interface IJob {
  id: string;
  jobType: JobType;
  dueBy: Date;
  customName?: string;
  bonsaiId: string;
}
