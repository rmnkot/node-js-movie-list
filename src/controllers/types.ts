import { MovieType } from '../data/fakeDB';

export type CreateRequestBody = {
  name: string;
  comment?: string;
  personalScore?: number;
};

export type GetAllRequestQuery = {
  sortBy?: keyof MovieType;
  page?: number | string;
  limit?: number | string;
  order?: SortOrder;
};

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
