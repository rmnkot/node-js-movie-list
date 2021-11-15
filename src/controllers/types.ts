import { FakeMovieListType } from '../data/fakeMovieList';

export type CreateRequestBody = {
  name: string;
  comment?: string;
  personalScore?: number;
};

export type GetAllRequestQuery = {
  sortBy?: keyof FakeMovieListType;
  page?: number;
  limit?: number;
  order?: SortOrder;
};

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
