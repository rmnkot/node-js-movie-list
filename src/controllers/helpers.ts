import { FakeMovieListType } from '../data/fakeMovieList';
import { GetAllRequestQuery, SortOrder } from './types';

export const customComparer =
  (order: SortOrder, sortBy: GetAllRequestQuery['sortBy']) =>
  (a: FakeMovieListType, b: FakeMovieListType) => {
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
