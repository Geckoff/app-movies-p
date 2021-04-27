import { IApiMovies } from "api";
import { IMovie, Movie } from "store/models";
import { IMovieStore } from "store/stores";
import { LoaderBase } from "./LoaderBase";

export class MovieLoader extends LoaderBase<IMovie, IMovieStore, IApiMovies> {
    private createMovieModel = (movieResponse: any) => new Movie(movieResponse);

    private getMoviesIds = (movieModels: IMovie[]) =>
        movieModels.map((movieModel) => movieModel.id);

    private createModelsFromResponse = (moviesResponse: any[]) =>
        moviesResponse.map(this.createMovieModel);

    private loadModels = async (fetchMethod: () => Promise<any>) => {
        const moviesResponse = await fetchMethod();
        const movieModels: IMovie[] = this.createModelsFromResponse(moviesResponse);
        this.store.addMultiple(movieModels);
        return movieModels;
    };

    loadMovieById = async (id: number) => {
        const movieResponse = await this.api.fetchMovieById(id);
        const movieModel = this.createMovieModel(movieResponse);
        this.store.add(movieModel);
    };

    loadTopMovies = async () => {
        const movieModels = await this.loadModels(this.api.fetchTopMovies);
        this.store.topMoviesIds = this.getMoviesIds(movieModels);
    };

    loadAllMoviesForPage = async (
        pageNumber: number,
        start: number,
        end: number,
        sort?: string
    ) => {
        const movieModels = await this.loadModels(
            this.api.fetchMoviesSlice.bind(this, start, end, sort)
        );
        this.store.allMoviesPerPageIds.set(pageNumber, this.getMoviesIds(movieModels));
    };

    loadAllMoviesCount = async () => {
        const movieCount = await this.api.fetchMoviesCount();
        this.store.allMoviesCount = movieCount;
    };

    loadGenreMoviesForPage = async (
        genre: string,
        pageNumber: number,
        start: number,
        end: number,
        sort?: string
    ) => {
        const movieModels = await this.loadModels(
            this.api.fetchGenreMoviesSlice.bind(this, genre, start, end, sort)
        );
        this.store.genreMoviesPerPageIds
            .get(genre)
            ?.set(pageNumber, this.getMoviesIds(movieModels));
    };

    loadGenreMoviesCount = async (genre: string) => {
        const movieCount = await this.api.fetchGenreMoviesCount(genre);
        this.store.genreMoviesCount.set(genre, movieCount);
    };

    loadMoviesSearch = async (searchTerm: string) => {
        const movieModels = await this.loadModels(
            this.api.fetchMoviesSearch.bind(this, searchTerm)
        );
        this.store.searchResults.set(searchTerm, this.getMoviesIds(movieModels));
    };
}

export interface IMovieLoader extends MovieLoader {}
