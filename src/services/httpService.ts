import axios, { AxiosResponse } from 'axios';

export enum ResponseState {
  True = 'True',
  False = 'False',
}

export type ServiceResponseType = {
  Title: string | null;
  Year: string | null;
  Rated: string | null;
  Released: string | null;
  Runtime: string | null;
  Genre: string | null;
  Director: string | null;
  Writer: string | null;
  Actors: string | null;
  Plot: string | null;
  Language: string | null;
  Country: string | null;
  Awards: string | null;
  Poster: string | null;
  Ratings: {
    Source: string | null;
    Value: string | null;
  }[];
  Metascore: string | null;
  imdbRating: string | null;
  imdbVotes: string | null;
  imdbID: string | null;
  Type: string | null;
  DVD: string | null;
  BoxOffice: string | null;
  Production: string | null;
  Website: string | null;
  Response: ResponseState | null;
};

class HttpService {
  async get(url: string) {
    try {
      const { data }: AxiosResponse<ServiceResponseType> = await axios.get(url);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(error.toJSON());
      }
      return Promise.reject(error);
    }
  }
}

export default new HttpService();
