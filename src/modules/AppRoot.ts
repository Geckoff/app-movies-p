import { ApiMovies, IApiMovies } from "api";
import { GenreMoviesVM, IGenreMoviesVM } from "components/GenreMovies";
import { HomeVM, IHomeVM } from "components/Home";
import {
    INetworkActivityIndicatorVM,
    NetworkActivityIndicatorVM,
} from "components/NetworkActivityIndicator";
import { ISearchInputVM, SearchInputVM } from "components/Search/SearchInput";
import { ISearchResultsVM, SearchResultsVM } from "components/Search/SearchResults";
import { ISingleMovieVM, SingleMovieVM } from "components/SingleMovie";
import { IMovieLoader, MovieLoader } from "store/loaders";
import { IMovieStore, MovieStore } from "store/stores";

export class AppRoot {
    movieStore: IMovieStore;
    movieLoader: IMovieLoader;
    movieApi: IApiMovies;
    homeVM: IHomeVM;
    singleMovieVM: ISingleMovieVM;
    actionMoviesVM: IGenreMoviesVM;
    comedyMoviesVM: IGenreMoviesVM;
    dramaMoviesVM: IGenreMoviesVM;
    crimeMoviesVM: IGenreMoviesVM;
    genreVMs: { [key: string]: IGenreMoviesVM };
    searchResultsVM: ISearchResultsVM;
    searchInputVM: ISearchInputVM;
    networkActivityIndicatorVM: INetworkActivityIndicatorVM;

    constructor() {
        this.movieStore = new MovieStore();
        this.movieApi = new ApiMovies();
        this.movieLoader = new MovieLoader(this.movieStore, this.movieApi);
        this.homeVM = new HomeVM(this.movieStore, this.movieLoader);
        this.singleMovieVM = new SingleMovieVM(this.movieStore, this.movieLoader);
        this.actionMoviesVM = new GenreMoviesVM(this.movieStore, this.movieLoader, "action");
        this.comedyMoviesVM = new GenreMoviesVM(this.movieStore, this.movieLoader, "comedy");
        this.dramaMoviesVM = new GenreMoviesVM(this.movieStore, this.movieLoader, "drama");
        this.crimeMoviesVM = new GenreMoviesVM(this.movieStore, this.movieLoader, "crime");
        this.searchResultsVM = new SearchResultsVM(this.movieStore, this.movieLoader);
        this.searchInputVM = new SearchInputVM();
        this.networkActivityIndicatorVM = new NetworkActivityIndicatorVM(this.movieApi.activeUrls);

        this.genreVMs = {
            action: this.actionMoviesVM,
            comedy: this.comedyMoviesVM,
            drama: this.dramaMoviesVM,
            crime: this.crimeMoviesVM,
        };
    }
}
