import dotenv from 'dotenv';
import Cli from './utils/cli';

dotenv.config();

const DEFAULT_PORT = 3000;
const DEFAULT_ENV = 'development';
const BASE_URL = 'http://www.omdbapi.com';
const URL = `${BASE_URL}/?apikey=${process.env.API_KEY}&`;

export default {
  APP_PORT: process.env.APP_PORT || DEFAULT_PORT,
  ENV: Cli.env || DEFAULT_ENV,
  URL,
};
