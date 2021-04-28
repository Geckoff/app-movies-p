import { IHasId } from "store/models/types";

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
    overview: string;
    posterPath: string;
    releaseDate: string;
    title: string;
    voteAverage: number;

    constructor(movieData: any) {
        this.id = movieData.id;
        this.cast = movieData.cast;
        this.director = movieData.director;
        this.genres = movieData.genres;
        this.overview = movieData.overview;
        this.posterPath = movieData.posterPath;
        this.releaseDate = movieData.releaseDate;
        this.title = movieData.title;
        this.voteAverage = movieData.voteAverage;
    }
}

export interface IMovie extends Movie {}
