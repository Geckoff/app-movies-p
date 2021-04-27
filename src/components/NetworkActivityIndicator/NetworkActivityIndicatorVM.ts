import { computed, observable } from "mobx";

export class NetworkActivityIndicatorVM {
    @observable activeUrls: string[] = [];

    constructor(activeUrls: string[]) {
        this.activeUrls = activeUrls;
    }

    @computed get hasNetworkActivity() {
        return this.activeUrls.length > 0;
    }
}

export interface INetworkActivityIndicatorVM extends NetworkActivityIndicatorVM {}
