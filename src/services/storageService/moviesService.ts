import { v4 as uuidv4 } from 'uuid';
import { CreateRequestBody } from '../../controllers/types';
import { ResponseState, ServiceResponseType } from '../httpService';
import { fakeDB, MovieType, movieModel } from '../../data/fakeDB';
import { StorageError } from './types';

class MoviesService {
  get(id: string) {
    const movie = fakeDB.movies.find((item) => item.id === id);

    return movie || { result: false, error: 'Movie not found' };
  }

  getAll() {
    return fakeDB.movies;
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

  delete(id: string) {
    const movieIdx = fakeDB.movies.findIndex((item) => item.id === id);

    if (movieIdx === -1) return { result: false, error: 'Movie was not found' };

    fakeDB.movies.splice(movieIdx, 1);

    return { result: true, message: 'Movie was deleted successfully' };
  }
}

export const movies = new MoviesService();
