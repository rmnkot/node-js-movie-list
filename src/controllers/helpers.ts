import { MovieType } from '../data/fakeDB';
import { GetAllRequestQuery, SortOrder } from './types';

export const customComparer =
  (order: SortOrder, sortBy: GetAllRequestQuery['sortBy']) =>
  (a: MovieType, b: MovieType) => {
    if (!sortBy) return 0;

    if (order === SortOrder.asc) {
      if (a[sortBy]! > b[sortBy]!) return 1;
      if (a[sortBy]! < b[sortBy]!) return -1;
      return 0;
    }

    if (a[sortBy]! < b[sortBy]!) return 1;
    if (a[sortBy]! > b[sortBy]!) return -1;
    return 0;
  };
