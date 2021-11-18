import { ServiceResponseType } from '../services/httpService';

export const movieModel = {
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

export type MovieType = {
  id: string;
  comment?: string;
  personalScore?: number;
  isFavourite?: boolean;
} & ServiceResponseType;

export enum Role {
  admin = 'admin',
  user = 'user',
}

export type FavouriteMovie = {
  id: string;
  name: string;
};

export type UserType = {
  id: string;
  email: string;
  password: string;
  role: Role;
  favouriteMovies: FavouriteMovie[];
};

export type FakeDBType = {
  movies: MovieType[];
  users: UserType[];
};

export const fakeDB: FakeDBType = {
  movies: [],
  users: [
    {
      id: 'faa733e8-fda5-4c04-847f-d95ede7dbc29',
      email: 'rmnkot@test.com',
      password: '$2a$07$rJdO90/c2OKeL7znIlFNNuBAK12PGfm93olcsQ5fI7L.tMSKhJ9ii', // "admin"
      role: 'admin' as Role.admin,
      favouriteMovies: [],
    },
  ],
};
