import { ITextInputVM, TextInputVM } from "components/Base/Input/TextInput";
import { action, observable } from "mobx";

export class SearchInputVM {
    @observable searchTerm: string = "";
    textIpnutVM: ITextInputVM;

    constructor() {
        this.textIpnutVM = new TextInputVM(this, "searchTerm");
    }

    @action setSearchTerm = (searchTerm: string) => {
        this.searchTerm = searchTerm;
    };
}

export interface ISearchInputVM extends SearchInputVM {}
