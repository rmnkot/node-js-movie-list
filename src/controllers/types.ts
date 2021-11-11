export type MovieRequestBody = {
  name: string;
  comment?: string;
  personalScore?: number;
};

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
