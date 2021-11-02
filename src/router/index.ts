import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import logger from '../utils/logger';
import { createNotFoundError } from '../services/errorService';
import { processRequest } from './helpers';

export type CreateServiceProps = (
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
  body?: string,
) => void;

export default class Router {
  private _PROTOCOL = 'http';

  private _baseUrl: string;

  private _url: URL;

  private _request: IncomingMessage;

  private _response: ServerResponse;

  private _router: Record<string, CreateServiceProps> = {};

  constructor(req: IncomingMessage, res: ServerResponse) {
    this._request = req;
    this._response = res;

    this._baseUrl = `${this._PROTOCOL}://${this._request.headers.host}`;
    this._url = new URL(req.url || '', this._baseUrl);

    logger.info(`Request url: ${this._url.pathname}`);
    logger.info(`Params: ${this._url.searchParams}`);
  }

  createRout = (pathname: string, createService: CreateServiceProps) => {
    this._router[pathname] = createService;
    return this;
  };

  serve = async () => {
    try {
      const { body } = await processRequest(this._request);

      this._router[this._url.pathname]
        ? this._router[this._url.pathname](this._request, this._response, this._url, body)
        : createNotFoundError(this._response);
    } catch (error) {
      logger.error(error);
    }
  };
}
