import { action, computed, observable } from "mobx";
import { IMovieLoader } from "store/loaders";
import { IMovieStore } from "store/stores";

export class AllMoviesVM {
    @observable page: number = 0;
    private movieStore: IMovieStore;
    private movieLoader: IMovieLoader;
    private moviesCountPerPage = 20;

    constructor(movieStore: IMovieStore, movieLoader: IMovieLoader) {
        this.movieStore = movieStore;
        this.movieLoader = movieLoader;
    }

    @action setPage = (pageNumber: number) => {
        this.page = pageNumber;
    };

    @computed get sliceStart() {
        return this.page * this.moviesCountPerPage;
    }

    @computed get sliceEnd() {
        return (this.page + 1) * this.moviesCountPerPage;
    }

    @computed get moviesForPage() {
        const moviesIdsPerPage = this.movieStore.allMoviesPerPageIds.get(this.page);
        if (!moviesIdsPerPage) {
            return [];
        }

        // FIX THE ORDER
        const allMoviesPerPageModels = this.movieStore.values.filter((movie) =>
            moviesIdsPerPage.includes(movie.id)
        );

        return allMoviesPerPageModels.length === moviesIdsPerPage.length
            ? allMoviesPerPageModels
            : [];
    }

    loadMovies = () => {
        if (this.moviesForPage.length === 0) {
            this.movieLoader.loadMoviesForPage(this.page, this.sliceStart, this.sliceEnd);
        }
    };
}

export interface IAllMoviesVM extends AllMoviesVM {}
