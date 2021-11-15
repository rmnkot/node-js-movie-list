import { Request, Response } from 'express';
import config from '../config';
import logger from '../utils/logger';
import HttpService from '../services/httpService';
import StorageService, { StorageError } from '../services/storageService';
import { CreateRequestBody, GetAllRequestQuery, SortOrder } from './types';
import { FakeMovieListType } from '../data/fakeMovieList';
import { customComparer } from './helpers';

class MovieController {
  async get(req: Request, res: Response) {
    try {
      const {
        params: { id },
      } = req;

      const data = StorageService.get(id);

      (data as StorageError).error && res.status(404);

      res.json(data);
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  }

  async getAll(req: Request<{}, {}, {}, GetAllRequestQuery>, res: Response) {
    try {
      const {
        query: { sortBy, page = 1, limit = 5, order = SortOrder.asc },
      } = req;

      const data = [...StorageService.getAll()];

      if (sortBy && sortBy.trim()) {
        data.sort(customComparer(order, sortBy));
      }

      const result = this.paginate({ arr: data, page, limit });

      res.json(result);
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
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

      const data = StorageService.create(requestData, httpResponse);

      (data as StorageError).error && res.status(400);

      res.json(data);
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        params: { id },
        body: { comment, personalScore },
      } = req;

      const data = StorageService.update(id, { comment, personalScore });

      (data as StorageError).error && res.status(404);

      res.json(data);
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const {
        params: { id },
      } = req;

      const data = StorageService.delete(id);

      (data as StorageError).error && res.status(404);

      res.json(data);
    } catch (error) {
      logger.error(error);
      res.status(500).json('Internal Server Error');
    }
  }

  private paginate({
    arr,
    page,
    limit,
  }: {
    arr: FakeMovieListType[];
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

export default new MovieController();
