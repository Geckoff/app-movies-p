import { ApiBase, IApiBase } from "./ApiBase";

export class ApiMovies extends ApiBase {
    fetchMovieById = (id: number) => this.serviceGet(`movies/${id}`);

    fetchTopMovies = () => this.serviceGet("movies?_sort=popularity&_order=desc&_end=5");

    fetchMoviesSlice = (start: number, end: number) =>
        this.serviceGet(`movies?_start=${start}&_end=${end}`);
}

export interface IApiMovies extends ApiMovies {}
