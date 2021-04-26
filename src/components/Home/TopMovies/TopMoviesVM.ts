import { computed, observable } from "mobx";
import { IMovieLoader } from "store/loaders";
import { IMovieStore } from "store/stores";

export class TopMoviesVM {
    private movieStore: IMovieStore;
    private movieLoader: IMovieLoader;

    constructor(movieStore: IMovieStore, movieLoader: IMovieLoader) {
        this.movieStore = movieStore;
        this.movieLoader = movieLoader;
    }

    @computed get topMovies() {
        const topMoviesIds = this.movieStore.topMoviesIds;
        if (topMoviesIds.length === 0) {
            return [];
        }

        const topMoviesModels = this.movieStore.values.filter((movie) =>
            topMoviesIds.includes(movie.id)
        );

        return topMoviesModels.length === topMoviesIds.length ? topMoviesModels : [];
    }

    loadTopMovies = () => {
        if (this.topMovies.length === 0) {
            this.movieLoader.loadTopMovies();
        }
    };
}

export interface ITopMoviesVM extends TopMoviesVM {}
