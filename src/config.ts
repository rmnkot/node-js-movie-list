import dotenv from 'dotenv';
import cli from './utils/cli';

dotenv.config();

const DEFAULT_PORT = 3000;
const DEFAULT_ENV = 'development';
const BASE_URL = 'http://www.omdbapi.com';
const DEFAULT_SECRET = 'DEFAULT_SECRET';

const APP_PORT = process.env.APP_PORT || DEFAULT_PORT;
const ENV = cli.env || DEFAULT_ENV;
const URL = `${BASE_URL}/?apikey=${process.env.API_KEY}&`;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || DEFAULT_SECRET;

export default {
  APP_PORT,
  ENV,
  URL,
  JWT_SECRET_KEY,
};
