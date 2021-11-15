import { Router } from 'express';
import { body, oneOf, param, query } from 'express-validator';
import { SortOrder } from '../controllers/types';
import moviesController from '../controllers/moviesController';
import { movieModel } from '../data/fakeDB';
import validationMessage from './validationMessage';
import { validate } from '../middleware/validationMiddleware';

const moviesRouter = Router();

moviesRouter
  .route('/')
  .get(
    query('sortBy').custom((value) => {
      if (value && !Object.keys(movieModel).includes(value)) {
        return Promise.reject(
          new Error(validationMessage.oneOf('sortBy', Object.keys(movieModel))),
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
    moviesController.getAll,
  )
  .post(
    body('name', validationMessage.required('name')).notEmpty(),
    body('personalScore', validationMessage.minMax('personalScore', { min: 1, max: 10 }))
      .if(body('personalScore').exists())
      .isFloat({ min: 1, max: 10 }),
    validate,
    moviesController.create,
  );

moviesRouter
  .route('/:id')
  .get(
    param('id', validationMessage.invalid('id')).isUUID(4),
    validate,
    moviesController.get,
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
    moviesController.update,
  )
  .delete(
    param('id', validationMessage.invalid('id')).isUUID(4),
    validate,
    moviesController.delete,
  );

export default moviesRouter;
