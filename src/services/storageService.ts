import { v4 as uuidv4 } from 'uuid';
import { MovieRequestBody } from '../controllers/types';
import { ResponseState, ServiceResponseType } from './httpService';
import { fakeMovieList, modelTemplate } from '../data/fakeMovieList';

class StorageService {
  get(id: string) {
    const movie = fakeMovieList.find((item) => item.id === id);

    return movie || {};
  }

  getAll() {
    return fakeMovieList;
  }

  create(requestData: MovieRequestBody, httpResponse: ServiceResponseType) {
    if (
      fakeMovieList.some(
        (item) =>
          (item.imdbID && item.imdbID === httpResponse.imdbID) ||
          item.Title === requestData.name,
      )
    ) {
      return { result: false, error: 'Movie already exist' };
    }

    const generatedId = uuidv4();

    const data = {
      ...modelTemplate,
      id: generatedId,
      Title: requestData.name,
      comment: requestData.comment,
      personalScore: requestData.personalScore,
      ...(httpResponse.Response === ResponseState.True && httpResponse),
    };

    fakeMovieList.push(data);

    return data;
  }

  update(id: string, requestData: Omit<MovieRequestBody, 'name'>) {
    const movie = fakeMovieList.find((item) => item.id === id);

    if (!movie) {
      return { result: false, error: 'Movie not found' };
    }

    const data = {
      ...movie,
      ...(requestData.comment && { comment: requestData.comment }),
      ...(requestData.personalScore && { personalScore: requestData.personalScore }),
    };

    const movieIdx = fakeMovieList.findIndex((item) => item.id === id);

    fakeMovieList.splice(movieIdx, 1, data);

    return data;
  }

  delete(id: string) {
    const movieIdx = fakeMovieList.findIndex((item) => item.id === id);

    if (movieIdx === -1) return { result: false };

    fakeMovieList.splice(movieIdx, 1);

    return { result: true };
  }
}

export default new StorageService();
