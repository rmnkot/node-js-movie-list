import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import logger from '../utils/logger';
import { createNotFoundError } from '../services/errorService';
import { processRequest } from './helpers';
import { createMovieService } from '../services/movieService';

const createRouter = async (req: IncomingMessage, res: ServerResponse) => {
  const { url: requestUrl = '', method, headers } = req;

  const PROTOCOL = 'http';
  const baseUrl = `${PROTOCOL}://${headers.host}`;
  const url = new URL(requestUrl, baseUrl);

  try {
    switch (url.pathname) {
      case '/movies':
        const { body } = await processRequest(req);
        createMovieService(url, method, res, body);
        break;

      default:
        createNotFoundError(res);
        break;
    }
  } catch (error) {
    logger.error(error);
  }
};

export default createRouter;
