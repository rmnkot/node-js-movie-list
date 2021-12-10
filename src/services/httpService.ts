import axios, { AxiosResponse } from 'axios';

export enum ResponseState {
  True = 'True',
  False = 'False',
}

export type ServiceResponseType = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: ResponseState;
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
