import { Request, Response } from 'express';
import config from '../config';
import httpService from '../services/httpService';
import storageService from '../services/storageService';
import { StorageError } from '../services/storageService/types';
import { CreateRequestBody, GetAllRequestQuery } from './types';
import { internalErrorResponse } from './helpers';
import { RequestWithUser } from '../types';

class MoviesController {
  async get(req: RequestWithUser, res: Response) {
    try {
      const {
        params: { id },
        user,
      } = req;

      const data = await storageService.movies.get(Number(id), user);

      (data as StorageError).error && res.status(404);

      res.json(data);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }

  async getAll(req: RequestWithUser<{}, {}, {}, GetAllRequestQuery>, res: Response) {
    try {
      const { query, user } = req;

      const data = await storageService.movies.getAll(query, user);

      res.json(data);
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
      const httpResponse = await httpService.get(url);

      const data = await storageService.movies.create(
        { name, comment, personalScore },
        httpResponse,
      );

      if ((data as StorageError).error) {
        res.status(400);
      } else {
        res.status(201);
      }

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

      const data = await storageService.movies.update(Number(id), {
        comment,
        personalScore,
      });

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

      const data = await storageService.movies.delete(Number(id), user?.id!);

      (data as StorageError).error && res.status(404);

      res.json(data);
    } catch (error) {
      internalErrorResponse(error, res);
    }
  }
}

export default new MoviesController();
