import { action, computed } from "mobx";

export class InputVM {
    source: { [key: string]: any };
    prop: string;

    constructor(source: { [key: string]: any }, prop: string) {
        this.source = source;
        this.prop = prop;
    }

    @computed get value() {
        return this.source[this.prop];
    }

    @action onChange = (value: string) => {
        this.source[this.prop] = value;
    };
}
