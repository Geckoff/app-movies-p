import { InputVM } from "../InputVM";
import { IOption } from "./types";

export class SelectVM extends InputVM {
    options: IOption[];

    constructor(source: { [key: string]: any }, prop: string, options: IOption[]) {
        super(source, prop);
        this.options = options;
    }
}

export interface ISelectVM extends SelectVM {}
