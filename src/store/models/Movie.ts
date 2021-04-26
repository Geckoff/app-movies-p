import { IHasId } from 'store/models/types';

export class Movie implements IHasId {
  id: number;
  cast: {
    character: string;
    name: string;
    order: number;
    profilePath: string;
  }[];
  director: {
    id: number;
    name: string;
    profilePath: string;
  };
  genres: string[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  runtime: number;
  title: string;
  voteAverage: number;
  voteCount: number;

  constructor(movieData: any) {
    this.id = movieData.id;
    this.cast = movieData.cast;
    this.director = movieData.director;
    this.genres = movieData.genres;
    this.originalLanguage = movieData.originalLanguage;
    this.originalTitle = movieData.originalTitle;
    this.overview = movieData.overview;
    this.popularity = movieData.popularity;
    this.posterPath = movieData.posterPath;
    this.releaseDate = movieData.releaseDate;
    this.runtime = movieData.runtime;
    this.title = movieData.title;
    this.voteAverage = movieData.voteAverage;
    this.voteCount = movieData.voteCount;
  }
}

export interface IMovie extends Movie {}
