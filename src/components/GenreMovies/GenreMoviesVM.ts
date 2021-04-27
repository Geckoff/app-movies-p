import {
    IMoviesPaginationVM,
    MoviesPaginationVM,
} from "components/Base/MoviesPagnation/MoviesPaginationVM";
import { IMovieLoader } from "store/loaders";
import { IMovieStore } from "store/stores";

export class GenreMoviesVM {
    moviesPaginationVM: IMoviesPaginationVM;

    constructor(movieStore: IMovieStore, movieLoader: IMovieLoader, genre: string) {
        this.moviesPaginationVM = new MoviesPaginationVM({
            movieStore,
            loadMoviesForPage: movieLoader.loadGenreMoviesForPage.bind(movieLoader, genre),
            loadMoviesCount: movieLoader.loadGenreMoviesCount.bind(movieLoader, genre),
            getMoviesPerPageIds: () => movieStore.genreMoviesPerPageIds.get(genre)!,
            getMoviesCount: () => movieStore.genreMoviesCount.get(genre)!,
        });
    }
}

export interface IGenreMoviesVM extends GenreMoviesVM {}
