import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import config from '../config';
import logger from '../utils/logger';
import HttpService from '../services/httpService';
import StorageService, { StorageError } from '../services/storageService';
import { CreateRequestBody, GetAllRequestQuery, SortOrder } from './types';
import { FakeMovieListType } from '../data/fakeMovieList';
import { customComparer } from './helpers';

class MovieController {
  get = async (req: Request, res: Response) => {
    try {
      const validationErrors = this.applyValidationResult(req, res);

      if (validationErrors) return;

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
  };

  getAll = async (req: Request<{}, {}, {}, GetAllRequestQuery>, res: Response) => {
    try {
      const validationErrors = this.applyValidationResult(req as unknown as Request, res);

      if (validationErrors) return;

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
  };

  create = async (req: Request<{}, {}, CreateRequestBody>, res: Response) => {
    try {
      const validationErrors = this.applyValidationResult(req, res);

      if (validationErrors) return;

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
  };

  update = async (req: Request, res: Response) => {
    try {
      const validationErrors = this.applyValidationResult(req, res);

      if (validationErrors) return;

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
  };

  delete = async (req: Request, res: Response) => {
    try {
      const validationErrors = this.applyValidationResult(req, res);

      if (validationErrors) return;

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
  };

  private applyValidationResult = (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      res.status(422).json({ errors: validationErrors.array() });
      return true;
    }

    return false;
  };

  private paginate = ({
    arr,
    page,
    limit,
  }: {
    arr: FakeMovieListType[];
    page: number;
    limit: number;
  }) => {
    const from = page * limit - limit;

    return {
      data: arr.slice(from, from + limit),
      info: {
        page,
        total: arr.length,
        pages: Math.ceil(arr.length / limit),
      },
    };
  };
}

export default new MovieController();
