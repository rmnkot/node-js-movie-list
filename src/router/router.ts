import { Router } from 'express';
import { body, oneOf, param, query } from 'express-validator';
import { SortOrder } from '../controllers/types';
import MovieController from '../controllers/movieController';
import { modelTemplate } from '../data/fakeMovieList';

const router = Router();

router
  .route('/movies')
  .get(
    query('sortBy').custom((value) => {
      if (value && !Object.keys(modelTemplate).includes(value)) {
        return Promise.reject(
          new Error(
            `Provide valid sortBy value as one of [${Object.keys(modelTemplate)}]`,
          ),
        );
      }
      return Promise.resolve();
    }),
    query('order').custom((value) => {
      if (value && ![SortOrder.asc, SortOrder.desc].includes(value)) {
        return Promise.reject(
          new Error(
            `Provide valid order value as one of [${[SortOrder.asc, SortOrder.desc]}]`,
          ),
        );
      }
      return Promise.resolve();
    }),
    MovieController.getAll,
  )
  .post(
    body('name', 'Name is required').notEmpty(),
    body('personalScore', 'Score must be from 1 to 10')
      .if(body('personalScore').exists())
      .isFloat({ min: 1, max: 10 }),
    MovieController.create,
  );

router
  .route('/movies/:id')
  .get(param('id', 'Provide a valid ID').isUUID(4), MovieController.get)
  .patch(
    param('id', 'Provide a valid ID').isUUID(4),
    oneOf([
      body('comment', 'Provide comment').notEmpty(),
      body('personalScore', 'Provide score').notEmpty(),
    ]),
    body('personalScore', 'Score must be from 1 to 10')
      .if(body('personalScore').exists())
      .isFloat({ min: 1, max: 10 }),
    MovieController.update,
  )
  .delete(param('id', 'Provide a valid ID').isUUID(4), MovieController.delete);

export default router;
