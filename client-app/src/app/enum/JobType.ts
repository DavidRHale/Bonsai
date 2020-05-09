export enum JobType {
  Prune = 1,
  Pinch,
  Repot,
  Fertilize,
  PestControl,
  Other,
}

export const toPrettyString = (value: JobType): string => {
  switch (value) {
    case JobType.PestControl:
      return 'Pest Control';
    default:
      return JobType[value];
  }
};
