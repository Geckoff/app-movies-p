import {
    IMoviesPaginationVM,
    MoviesPaginationVM,
} from "components/Base/MoviesPagnation/MoviesPaginationVM";
import { IMovieLoader } from "store/loaders";
import { IMovieStore } from "store/stores";

export class AllMoviesVM {
    moviesPaginationVM: IMoviesPaginationVM;

    constructor(movieStore: IMovieStore, movieLoader: IMovieLoader) {
        this.moviesPaginationVM = new MoviesPaginationVM({
            movieStore,
            loadMoviesForPage: movieLoader.loadAllMoviesForPage,
            loadMoviesCount: movieLoader.loadAllMoviesCount,
            getMoviesPerPageIds: () => movieStore.allMoviesPerPageIds,
            getMoviesCount: () => movieStore.allMoviesCount,
        });
    }
}

export interface IAllMoviesVM extends AllMoviesVM {}
