import { ApiBase } from "./ApiBase";

export class ApiMovies extends ApiBase {
    private appendSortParam = (url: string, sortBy?: string) => {
        return sortBy ? `${url}&_sort=${sortBy}` : url;
    };

    fetchMovieById = (id: number) => this.serviceGet(`movies/${id}`);

    fetchTopMovies = () => this.serviceGet("movies?_sort=popularity&_order=desc&_end=5");

    fetchMoviesSlice = (start: number, end: number, sortBy?: string) => {
        const url = this.appendSortParam(`movies?_start=${start}&_end=${end}`, sortBy);
        return this.serviceGet(url);
    };

    /**
     * Assuming there is a cheap call that allows to fetch the number of all movies
     * Since there is no one for json-server, mocking it in the follwing way
     */
    fetchMoviesCount = () => this.serviceGet(`movies`).then((response) => response.length);

    fetchGenreMoviesSlice = (genre: string, start: number, end: number, sortBy?: string) => {
        const url = this.appendSortParam(
            `movies?genres_like=${genre}&_start=${start}&_end=${end}`,
            sortBy
        );
        return this.serviceGet(url);
    };

    /**
     * Assuming there is a cheap call that allows to fetch the number of movies by genre
     * Since there is no one for json-server, mocking it in the follwing way
     */
    fetchGenreMoviesCount = (genre: string) =>
        this.serviceGet(`movies?genres_like=${genre}`).then((response) => response.length);

    fetchMoviesSearch = (searchTerm: string) => this.serviceGet(`movies?title_like=${searchTerm}`);
}

export interface IApiMovies extends ApiMovies {}
