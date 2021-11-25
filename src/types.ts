import { Request } from 'express';
import { User } from './database/models/user';

export type RequestWithUser<
  P = { [key: string]: string },
  ResBody = any,
  ReqBody = any,
  ReqQuery = { [key: string]: undefined | string | string[] },
  Locals extends Record<string, any> = Record<string, any>,
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & { user?: User };
