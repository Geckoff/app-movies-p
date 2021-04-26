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

    loadMoviesForPage = async (pageNumber: number, start: number, end: number) => {
        const movieModels = await this.loadModels(this.api.fetchMoviesSlice.bind(this, start, end));
        this.store.allMoviesPerPageIds.set(pageNumber, this.getMoviesIds(movieModels));
    };
}

export interface IMovieLoader extends MovieLoader {}
