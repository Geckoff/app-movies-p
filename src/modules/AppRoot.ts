import { ApiMovies, IApiMovies } from 'api';
import { HomeVM, IHomeVM } from 'components/Home';
import { ISingleMovieVM, SingleMovieVM } from 'components/SingleMovie';
import { IMovieLoader, MovieLoader } from 'store/loaders';
import { IMovieStore, MovieStore } from 'store/stores';

export class AppRoot {
  movieStore: IMovieStore;
  movieLoader: IMovieLoader;
  movieApi: IApiMovies;
  homeVM: IHomeVM;
  singleMovieVM: ISingleMovieVM;

  constructor() {
    this.movieStore = new MovieStore();
    this.movieApi = new ApiMovies();
    this.movieLoader = new MovieLoader(this.movieStore, this.movieApi);
    this.homeVM = new HomeVM(this.movieStore, this.movieLoader);
    this.singleMovieVM = new SingleMovieVM(this.movieStore, this.movieLoader);
  }
}
