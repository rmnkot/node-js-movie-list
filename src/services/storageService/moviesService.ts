import { v4 as uuidv4 } from 'uuid';
import { CreateRequestBody } from '../../controllers/types';
import { ResponseState, ServiceResponseType } from '../httpService';
import {
  fakeDB,
  MovieType,
  movieModel,
  UserType,
  FavouriteMovie,
} from '../../data/fakeDB';
import { StorageError } from './types';
import { users as userService } from './usersService';

class MoviesService {
  get(id: string, user?: UserType) {
    const movie = fakeDB.movies.find((item) => item.id === id);

    if (user && movie) {
      const isFavMovie = user.favouriteMovies.find((item) => item.id === movie.id);

      isFavMovie && (movie.isFavourite = true);
    }

    return movie || { result: false, error: 'Movie not found' };
  }

  getAll(user?: UserType) {
    if (!user) return fakeDB.movies;

    const favMoviesMap = user.favouriteMovies.reduce(
      (acc: Record<string, FavouriteMovie>, movie) => ({
        ...acc,
        ...{ [movie.id]: movie },
      }),
      {},
    );

    const movies = fakeDB.movies.map((movie) => {
      if (favMoviesMap[movie.id]) {
        const movieCopy = { ...movie };

        movieCopy.isFavourite = true;
        return movieCopy;
      }
      return movie;
    });

    return movies;
  }

  create(
    requestData: CreateRequestBody,
    httpResponse: ServiceResponseType,
  ): MovieType | StorageError {
    if (
      fakeDB.movies.some(
        (item) =>
          (item.imdbID && item.imdbID === httpResponse.imdbID) ||
          item.Title === requestData.name,
      )
    ) {
      return { result: false, error: 'Movie already exist' };
    }

    const generatedId = uuidv4();

    const data = {
      ...movieModel,
      id: generatedId,
      Title: requestData.name,
      comment: requestData.comment,
      personalScore: requestData.personalScore,
      ...(httpResponse.Response === ResponseState.True && httpResponse),
    };

    fakeDB.movies.push(data);

    return data;
  }

  update(
    id: string,
    requestData: Omit<CreateRequestBody, 'name'>,
  ): MovieType | StorageError {
    const movie = fakeDB.movies.find((item) => item.id === id);

    if (!movie) {
      return { result: false, error: 'Movie not found' };
    }

    const data = {
      ...movie,
      ...(requestData.comment && { comment: requestData.comment }),
      ...(requestData.personalScore && { personalScore: requestData.personalScore }),
    };

    const movieIdx = fakeDB.movies.findIndex((item) => item.id === id);

    fakeDB.movies.splice(movieIdx, 1, data);

    return data;
  }

  delete(movieId: string, userId: string) {
    // delete user's favourite movie
    userService.deleteFavourite(userId, movieId);

    const movieIdx = fakeDB.movies.findIndex((item) => item.id === movieId);

    if (movieIdx === -1) return { result: false, error: 'Movie was not found' };

    fakeDB.movies.splice(movieIdx, 1);

    return { result: true, message: 'Movie was deleted successfully' };
  }
}

export const movies = new MoviesService();
