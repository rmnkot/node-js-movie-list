import { ServerResponse } from 'http';
import { createValidationError } from './errorService';
import { fakeMovieList } from '../data/fakeMovieList';

const getMovies = (url: URL, res: ServerResponse) => {
  const params = url.searchParams;

  let responseBody: { title: string }[];

  if (params.has('t')) {
    const title = params.get('t')?.toLowerCase();
    const movie = fakeMovieList.filter((item) => item.title.toLowerCase() === title);
    responseBody = movie;
  } else {
    responseBody = fakeMovieList;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(responseBody));
};

const addMovie = (url: URL, res: ServerResponse, body?: string) => {
  if (!body) {
    const errMessage = 'Body is required';
    createValidationError(res, url.pathname, errMessage);
    return;
  }

  const parsedBody = JSON.parse(body);

  if (!parsedBody.title) {
    const errMessage = 'Title property is required';
    createValidationError(res, url.pathname, errMessage);
    return;
  }

  fakeMovieList.push({ title: parsedBody.title });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(fakeMovieList));
};

export const createMovieService = (
  url: URL,
  method: string = 'GET',
  res: ServerResponse,
  body?: string,
) => {
  switch (method) {
    case 'POST':
      addMovie(url, res, body);
      break;

    default:
      getMovies(url, res);
      break;
  }
};
