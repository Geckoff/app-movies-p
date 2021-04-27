import axios from "axios";
import { action, observable } from "mobx";

export class ApiBase {
    private host: string = "http://localhost:2020";
    @observable activeUrls: string[] = [];

    protected get = async (endpoint: string) => {
        try {
            this.startNetworkActivity(endpoint);
            const response = await axios.get(endpoint);
            this.endNetworkActivity(endpoint);
            return response.data;
        } catch (e) {
            this.endNetworkActivity(endpoint);
            console.error(e.message);
            return null;
        }
    };

    protected serviceGet = (servicesEndpoint: string) =>
        this.get(`${this.host}/${servicesEndpoint}`);

    @action startNetworkActivity = (url: string) => {
        this.activeUrls.push(url);
    };

    @action endNetworkActivity = (url: string) => {
        const urlIndex = this.activeUrls.indexOf(url);
        if (urlIndex !== -1) {
            this.activeUrls.splice(urlIndex, 1);
        }
    };
}

export interface IApiBase extends ApiBase {}
