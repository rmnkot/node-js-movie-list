import jwt from 'jsonwebtoken';
import { Role } from '../database/models/user';
import config from '../config';
import logger from '../utils/logger';

declare module 'jsonwebtoken' {
  export interface CustomJwtPayload extends jwt.JwtPayload {
    payload: {
      id: number;
      role: Role;
    };
  }
}

const jwtHeaders = {
  issuer: 'Movie Service',
  expiresIn: '1h',
};

export const generateAccessToken = (id: number, role: Role) => {
  const payload = {
    id,
    role,
  };

  return jwt.sign({ payload }, config.JWT_SECRET_KEY, jwtHeaders);
};

export const verifyAccessToken = (token: string) => {
  try {
    const { payload } = <jwt.CustomJwtPayload>(
      jwt.verify(token, config.JWT_SECRET_KEY, jwtHeaders)
    );

    return payload;
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};
