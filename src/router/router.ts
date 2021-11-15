import { Router } from 'express';
import { body, oneOf, param, query } from 'express-validator';
import { SortOrder } from '../controllers/types';
import MovieController from '../controllers/movieController';
import { modelTemplate } from '../data/fakeMovieList';
import validationMessage from './validationMessage';
import { validate } from '../middleware/validationMiddleware';

const router = Router();

router
  .route('/movies')
  .get(
    query('sortBy').custom((value) => {
      if (value && !Object.keys(modelTemplate).includes(value)) {
        return Promise.reject(
          new Error(validationMessage.oneOf('sortBy', Object.keys(modelTemplate))),
        );
      }
      return Promise.resolve();
    }),
    query('order').custom((value) => {
      if (value && ![SortOrder.asc, SortOrder.desc].includes(value)) {
        return Promise.reject(
          new Error(validationMessage.oneOf('order', [SortOrder.asc, SortOrder.desc])),
        );
      }
      return Promise.resolve();
    }),
    validate,
    MovieController.getAll,
  )
  .post(
    body('name', validationMessage.required('name')).notEmpty(),
    body('personalScore', validationMessage.minMax('personalScore', { min: 1, max: 10 }))
      .if(body('personalScore').exists())
      .isFloat({ min: 1, max: 10 }),
    validate,
    MovieController.create,
  );

router
  .route('/movies/:id')
  .get(
    param('id', validationMessage.invalid('id')).isUUID(4),
    validate,
    MovieController.get,
  )
  .patch(
    param('id', validationMessage.invalid('id')).isUUID(4),
    oneOf([
      body('comment', validationMessage.provide('comment')).notEmpty(),
      body('personalScore', validationMessage.provide('personalScore')).notEmpty(),
    ]),
    body('personalScore', validationMessage.minMax('personalScore', { min: 1, max: 10 }))
      .if(body('personalScore').exists())
      .isFloat({ min: 1, max: 10 }),
    validate,
    MovieController.update,
  )
  .delete(
    param('id', validationMessage.invalid('id')).isUUID(4),
    validate,
    MovieController.delete,
  );

export default router;
