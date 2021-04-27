import { action, observable, ObservableMap } from "mobx";
import { IMovie } from "store/models";
import { BaseStore } from "./BaseStore";

export class MovieStore extends BaseStore<IMovie> {
    @observable topMoviesIds: number[] = [];

    @observable allMoviesPerPageIds: ObservableMap<number, number[]> = new ObservableMap();
    @observable allMoviesCount: number = 0;

    @observable genreMoviesPerPageIds: ObservableMap<string, ObservableMap<number, number[]>>;
    @observable genreMoviesCount: ObservableMap<string, number>;

    constructor() {
        super();

        this.genreMoviesPerPageIds = new ObservableMap();
        this.genreMoviesPerPageIds.set("comedy", new ObservableMap());
        this.genreMoviesPerPageIds.set("action", new ObservableMap());
        this.genreMoviesPerPageIds.set("drama", new ObservableMap());
        this.genreMoviesPerPageIds.set("crime", new ObservableMap());

        this.genreMoviesCount = new ObservableMap();
        this.genreMoviesCount.set("comedy", 0);
        this.genreMoviesCount.set("action", 0);
        this.genreMoviesCount.set("drama", 0);
        this.genreMoviesCount.set("crime", 0);
    }

    @observable searchResults: ObservableMap<string, number[]> = new ObservableMap();

    @action resetPageCache = (map: ObservableMap<number, number[]>) => {
        map.clear();
    };
}

export interface IMovieStore extends MovieStore {}
