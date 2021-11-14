import { MovieType } from '../data/fakeDB';

export type CreateRequestBody = {
  name: string;
  comment?: string;
  personalScore?: number;
};

export type GetAllRequestQuery = {
  sortBy?: keyof MovieType;
  page?: number;
  limit?: number;
  order?: SortOrder;
};

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
