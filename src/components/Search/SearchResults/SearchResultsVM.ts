import { action, computed, IReactionDisposer, observable, reaction } from "mobx";
import { IMovieLoader } from "store/loaders";
import { IMovieStore } from "store/stores";

export class SearchResultsVM {
    @observable searchTerm: string | null = null;
    searchReactionDisposer: IReactionDisposer;
    movieStore: IMovieStore;
    movieLoader: IMovieLoader;

    constructor(movieStore: IMovieStore, movieLoader: IMovieLoader) {
        this.movieStore = movieStore;
        this.movieLoader = movieLoader;

        //TODO: dispose reaction
        this.searchReactionDisposer = reaction(() => this.searchTerm, this.loadMovies);
    }

    @action setSearchTerm = (searchTerm: string | null) => {
        this.searchTerm = searchTerm;
    };

    @computed get searchResultsIds() {
        return this.searchTerm === null ? [] : this.movieStore.searchResults.get(this.searchTerm);
    }

    @computed get searchResults() {
        if (!this.searchResultsIds) {
            return null;
        }

        // FIX THE ORDER
        const searchResultsModels = this.movieStore.values.filter((movie) =>
            this.searchResultsIds!.includes(movie.id)
        );

        return searchResultsModels.length === this.searchResultsIds.length
            ? searchResultsModels
            : null;
    }

    loadMovies = () => {
        if (this.searchResults === null && this.searchTerm !== null) {
            this.movieLoader.loadMoviesSearch(this.searchTerm);
        }
    };
}

export interface ISearchResultsVM extends SearchResultsVM {}
