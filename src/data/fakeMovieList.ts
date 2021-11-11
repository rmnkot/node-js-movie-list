import { MovieRequestBody } from '../controllers/types';
import { ServiceResponseType } from '../services/httpService';

export const modelTemplate = {
  id: null,
  comment: null,
  personalScore: null,
  Title: null,
  Year: null,
  Rated: null,
  Released: null,
  Runtime: null,
  Genre: null,
  Director: null,
  Writer: null,
  Actors: null,
  Plot: null,
  Language: null,
  Country: null,
  Awards: null,
  Poster: null,
  Ratings: [],
  Metascore: null,
  imdbRating: null,
  imdbVotes: null,
  imdbID: null,
  Type: null,
  DVD: null,
  BoxOffice: null,
  Production: null,
  Website: null,
  Response: null,
};

export type FakeMovieListType = {
  id: string;
} & Omit<MovieRequestBody, 'name'> &
  ServiceResponseType;

export const fakeMovieList: FakeMovieListType[] = [];
