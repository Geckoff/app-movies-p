import axios from "axios";

export class ApiBase {
    private host: string = "http://localhost:2020";

    protected get = async (endpoint: string) => {
        const response = await axios.get(endpoint);
        return response.data;
    };

    protected serviceGet = (servicesEndpoint: string) =>
        this.get(`${this.host}/${servicesEndpoint}`);
}

export interface IApiBase extends ApiBase {}
