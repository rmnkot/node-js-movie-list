import { ServerResponse } from 'http';
import { CreateServiceProps } from '../router';

const login = (res: ServerResponse) => {
  /** Test response */
  res.writeHead(401, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Unauthorized user' }));
};
export const createAuthService: CreateServiceProps = (req, res, url, body) => {
  switch (req.method) {
    case 'GET':
      login(res);
      break;

    default:
      break;
  }
};
