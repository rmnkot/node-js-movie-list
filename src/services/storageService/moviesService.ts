import {
  CreateRequestBody,
  GetAllRequestQuery,
  SortOrder,
} from '../../controllers/types';
import { ResponseState, ServiceResponseType } from '../httpService';
import { StorageError } from './types';
import { Movie } from '../../database/models/movie';
import { User } from '../../database/models/user';
import { FavMovie } from '../../database/models/favMovie';

class MoviesService {
  async get(id: number, user?: User) {
    const movie = await Movie.findByPk(id, {
      include: {
        model: FavMovie,
        as: 'favourites',
        attributes: { exclude: ['createdAt', 'updatedAt', 'movie_id'] },
        where: {
          user_id: user?.id || null,
        },
        required: false,
      },
    });

    return movie || { result: false, error: 'Movie was not found' };
  }

  async getAll(
    { sortBy = 'id', page = 1, limit = 5, order = SortOrder.asc }: GetAllRequestQuery,
    user?: User,
  ) {
    const offset = page * limit - limit;

    const { count, rows } = await Movie.findAndCountAll({
      order: [[sortBy, order]],
      limit,
      offset,
      include: {
        model: FavMovie,
        as: 'favourites',
        attributes: { exclude: ['createdAt', 'updatedAt', 'movie_id'] },
        where: {
          user_id: user?.id || null,
        },
        required: false,
      },
    });

    return {
      data: rows,
      info: {
        page,
        total: count,
        pages: Math.ceil(count / limit),
      },
    };
  }

  async create(
    requestData: CreateRequestBody,
    httpResponse: ServiceResponseType,
  ): Promise<Movie | StorageError> {
    const data = {
      title: requestData.name,
      imdb_id: '',
      ...(requestData.comment && { comment: requestData.comment }),
      ...(requestData.personalScore && { personal_score: requestData.personalScore }),
      ...(httpResponse.Response === ResponseState.True && {
        title: httpResponse.Title || '',
        year: httpResponse.Year,
        rated: httpResponse.Rated,
        released: httpResponse.Released,
        runtime: httpResponse.Runtime,
        genre: httpResponse.Genre,
        director: httpResponse.Director,
        writer: httpResponse.Writer,
        actors: httpResponse.Actors,
        plot: httpResponse.Plot,
        language: httpResponse.Language,
        country: httpResponse.Country,
        awards: httpResponse.Awards,
        poster: httpResponse.Poster,
        metascore: httpResponse.Metascore,
        imdb_rating: httpResponse.imdbRating,
        imdb_votes: httpResponse.imdbVotes,
        imdb_id: httpResponse.imdbID,
        type: httpResponse.Type,
        dvd: httpResponse.DVD,
        box_office: httpResponse.BoxOffice,
        production: httpResponse.Production,
        website: httpResponse.Website,
        response: httpResponse.Response,
      }),
    };

    const [movie, isCreated] = await Movie.findOrCreate({
      where: { imdb_id: httpResponse.imdbID || null },
      defaults: data,
      raw: true,
    });

    return isCreated ? movie : { result: false, error: 'Movie already exists' };
  }

  async update(
    id: number,
    requestData: Omit<CreateRequestBody, 'name'>,
  ): Promise<Movie | StorageError> {
    const [isUpdated, movieList] = await Movie.update(
      { comment: requestData.comment, personal_score: requestData.personalScore },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    return isUpdated ? movieList[0] : { result: false, error: 'Movie was not found' };
  }

  async delete(movieId: number, userId: number) {
    const res = await Movie.destroy({
      where: {
        id: movieId,
      },
    });

    return res
      ? { result: true, message: 'Movie was deleted successfully' }
      : { result: false, error: 'Movie was not found' };
  }
}

export const movies = new MoviesService();
