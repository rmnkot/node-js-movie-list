import { Request, Response } from 'express';
import config from '../config';
import HttpService from '../services/httpService';
import storageService from '../services/storageService';
import { StorageError } from '../services/storageService/types';
import { CreateRequestBody, GetAllRequestQuery, SortOrder } from './types';
import { MovieType } from '../data/fakeDB';
import { customComparer, internalErrorResponse } from './helpers';
import { RequestWithUser } from '../types';

class MoviesController {
  constructor() {
    this.getAll = this.getAll.bind(this);
  }

  async get(req: RequestWithUser, res: Response) {
    try {
      const {
        params: { id },
        user,
      } = req;

      const data = storageService.movies.get(id, user);

      (data as StorageError).error && res.status(404);

      res.json(data);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async getAll(req: RequestWithUser<{}, {}, {}, GetAllRequestQuery>, res: Response) {
    try {
      const {
        query: { sortBy, page = 1, limit = 5, order = SortOrder.asc },
        user,
      } = req;

      const data = [...storageService.movies.getAll(user)];

      if (sortBy && sortBy.trim()) {
        data.sort(customComparer(order, sortBy));
      }

      const result = this.paginate({
        arr: data,
        page: Number(page),
        limit: Number(limit),
      });

      res.json(result);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async create(req: Request<{}, {}, CreateRequestBody>, res: Response) {
    try {
      const {
        body: { name, comment, personalScore },
      } = req;

      const url = `${config.URL}t=${name}`;
      const httpResponse = await HttpService.get(url);

      const requestData = { name, comment, personalScore };

      const data = storageService.movies.create(requestData, httpResponse);

      (data as StorageError).error && res.status(400);

      res.json(data);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        params: { id },
        body: { comment, personalScore },
      } = req;

      const data = storageService.movies.update(id, { comment, personalScore });

      (data as StorageError).error && res.status(404);

      res.json(data);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async delete(req: RequestWithUser, res: Response) {
    try {
      const {
        params: { id },
        user,
      } = req;

      const data = storageService.movies.delete(id, user?.id!);

      (data as StorageError).error && res.status(404);

      res.json(data);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  private paginate({
    arr,
    page,
    limit,
  }: {
    arr: MovieType[];
    page: number;
    limit: number;
  }) {
    const from = page * limit - limit;

    return {
      data: arr.slice(from, from + limit),
      info: {
        page,
        total: arr.length,
        pages: Math.ceil(arr.length / limit),
      },
    };
  }
}

export default new MoviesController();
