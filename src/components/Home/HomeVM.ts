import { IMovieLoader } from "store/loaders";
import { IMovieStore } from "store/stores";
import { AllMoviesVM, IAllMoviesVM } from "./AllMovies";
import { ITopMoviesVM, TopMoviesVM } from "./TopMovies";

export class HomeVM {
    // movieStore: IMovieStore;
    // movieLoader: IMovieLoader;
    topMoviesVM: ITopMoviesVM;
    allMoviesVM: IAllMoviesVM;

    constructor(movieStore: IMovieStore, movieLoader: IMovieLoader) {
        this.topMoviesVM = new TopMoviesVM(movieStore, movieLoader);
        this.allMoviesVM = new AllMoviesVM(movieStore, movieLoader);
    }
}

export interface IHomeVM extends HomeVM {}
