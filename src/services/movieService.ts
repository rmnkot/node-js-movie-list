import { ServerResponse } from 'http';
import { createValidationError } from './errorService';
import { fakeMovieList } from '../data/fakeMovieList';
import { CreateServiceProps } from '../router';

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

export const createMovieService: CreateServiceProps = (req, res, url, body) => {
  switch (req.method) {
    case 'GET':
      getMovies(url, res);
      break;

    case 'POST':
      addMovie(url, res, body);
      break;

    default:
      break;
  }
};
