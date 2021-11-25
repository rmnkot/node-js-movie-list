import { Movie } from '../database/models/movie';

export type CreateRequestBody = {
  name: string;
  comment?: string;
  personalScore?: number;
};

export type GetAllRequestQuery = {
  sortBy?: keyof Movie;
  page?: number;
  limit?: number;
  order?: SortOrder;
};

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
