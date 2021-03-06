import { Router } from 'express';
import { body, oneOf, param, query } from 'express-validator';
import { SortOrder } from '../controllers/types';
import moviesController from '../controllers/moviesController';
import validationMessage from './validationMessage';
import { validate } from '../middleware/validationMiddleware';
import { authorize, userAccess } from '../middleware/authMiddleware';
import { Movie } from '../database/models/movie';

const moviesRouter = Router();

moviesRouter.use(authorize);

moviesRouter
  .route('/')
  .get(
    /* Auth - FavMovies */
    query('sortBy').custom((value) => {
      if (value && !Object.keys(Movie.rawAttributes).includes(value)) {
        return Promise.reject(
          new Error(validationMessage.oneOf('sortBy', Object.keys(Movie.rawAttributes))),
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
    query('page', validationMessage.invalid('page')).isInt(),
    query('limit', validationMessage.invalid('limit')).isInt(),
    validate,
    moviesController.getAll,
  )
  .post(
    /* Auth */
    userAccess,
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
    /* Auth - isFavMovie */
    param('id', validationMessage.invalid('id')).isInt(),
    validate,
    moviesController.get,
  )
  .patch(
    /* Auth */
    userAccess,
    param('id', validationMessage.invalid('id')).isInt(),
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
    /* Auth */
    userAccess,
    param('id', validationMessage.invalid('id')).isInt(),
    validate,
    moviesController.delete,
  );

export default moviesRouter;
