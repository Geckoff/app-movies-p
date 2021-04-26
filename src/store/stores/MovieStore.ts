import { action, computed, observable, ObservableMap } from "mobx";
import { IMovie } from "store/models";
import { BaseStore } from "./BaseStore";

export class MovieStore extends BaseStore<IMovie> {
    @observable topMoviesIds: number[] = [];
    @observable allMoviesPerPageIds: ObservableMap<number, number[]> = new ObservableMap();
}

export interface IMovieStore extends MovieStore {}
