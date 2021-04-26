import { action, computed, observable } from "mobx";
import { IMovieLoader } from "store/loaders";
import { IMovieStore } from "store/stores";

export class SingleMovieVM {
    movieStore: IMovieStore;
    movieLoader: IMovieLoader;
    @observable id: number = 0;

    constructor(movieStore: IMovieStore, movieLoader: IMovieLoader) {
        this.movieStore = movieStore;
        this.movieLoader = movieLoader;
    }

    @action loadMovie = (id: number) => {
        this.id = id;
        if (!this.movie) {
            this.movieLoader.loadMovieById(id);
        }
    };

    @computed get movie() {
        return this.movieStore.getById(this.id);
    }
}

export interface ISingleMovieVM extends SingleMovieVM {}
