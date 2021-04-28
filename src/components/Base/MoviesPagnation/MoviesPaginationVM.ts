import { action, computed, IReactionDisposer, observable, ObservableMap, reaction } from "mobx";
import { IMovieStore } from "store/stores";
import { ISelectVM, SelectVM } from "../Input/Select";
import { SortBy } from "./types";

export interface IMoviesPaginationVMProps {
    movieStore: IMovieStore;
    loadMoviesForPage: (page: number, sliceStart: number, sliceEnd: number) => void;
    loadMoviesCount: () => void;
    getMoviesPerPageIds: () => ObservableMap<number, number[]>;
    getMoviesCount: () => number;
}

export class MoviesPaginationVM {
    movieStore: IMovieStore;
    @observable page: number = 0;
    @observable sortBy?: SortBy = SortBy.Default;
    loadMoviesForPage: (
        page: number,
        sliceStart: number,
        sliceEnd: number,
        sortBy?: string
    ) => void;
    loadMoviesCount: () => void;
    private moviesCountPerPage = 10;
    loadReactionDisposer: IReactionDisposer;
    resetReactionDisposer: IReactionDisposer;
    getMoviesPerPageIds: () => ObservableMap<number, number[]>;
    getMoviesCount: () => number;
    sortBySelectVM: ISelectVM;

    constructor({
        movieStore,
        loadMoviesForPage,
        loadMoviesCount,
        getMoviesPerPageIds,
        getMoviesCount,
    }: IMoviesPaginationVMProps) {
        this.movieStore = movieStore;
        this.loadMoviesForPage = loadMoviesForPage;
        this.loadMoviesCount = loadMoviesCount;
        this.getMoviesPerPageIds = getMoviesPerPageIds;
        this.getMoviesCount = getMoviesCount;
        this.sortBySelectVM = new SelectVM(this, "sortBy", [
            {
                label: "Default",
                value: SortBy.Default,
            },
            {
                label: "Popularity",
                value: SortBy.Popularity,
            },
            {
                label: "Release Date",
                value: SortBy.ReleaseDate,
            },
            {
                label: "Vote Average",
                value: SortBy.VoteAverage,
            },
        ]);

        //TODO: dispose reaction
        this.loadReactionDisposer = reaction(() => this.page, this.loadMovies);
        this.resetReactionDisposer = reaction(() => this.sortBy, this.resetPageCache);
    }

    resetPageCache = () => {
        this.movieStore.resetPageCache(this.moviesPerPageIds);
        this.loadMovies();
    };

    @computed get moviesPerPageIds() {
        return this.getMoviesPerPageIds();
    }

    @computed get moviesCount() {
        return this.getMoviesCount();
    }

    @action setPage = (pageNumber: number) => {
        this.page = pageNumber;
    };

    @computed get sliceStart() {
        return (this.page - 1) * this.moviesCountPerPage;
    }

    @computed get sliceEnd() {
        return this.page * this.moviesCountPerPage;
    }

    @computed get moviesForPage() {
        const moviesIdsPerPage = this.moviesPerPageIds.get(this.page);
        if (!moviesIdsPerPage) {
            return [];
        }

        const moviesPerPageModels = this.movieStore.values.filter((movie) =>
            moviesIdsPerPage.includes(movie.id)
        );

        if (moviesPerPageModels.length !== moviesIdsPerPage.length) {
            return [];
        }

        const moviesPerPageModelsMap = new Map();
        moviesPerPageModels.forEach((model) => {
            moviesPerPageModelsMap.set(model.id, model);
        });

        return moviesIdsPerPage.map((id) => moviesPerPageModelsMap.get(id));
    }

    loadMovies = () => {
        if (this.moviesForPage.length === 0) {
            this.loadMoviesForPage(
                this.page,
                this.sliceStart,
                this.sliceEnd,
                this.sortBy !== SortBy.Default ? this.sortBy : undefined
            );
        }
    };

    loadCount = () => {
        if (!this.moviesCount) {
            this.loadMoviesCount();
        }
    };

    @computed get pagesCount() {
        return this.moviesCount && Math.ceil(this.moviesCount / this.moviesCountPerPage);
    }
}

export interface IMoviesPaginationVM extends MoviesPaginationVM {}
