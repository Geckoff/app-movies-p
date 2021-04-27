import React, { useCallback, useEffect } from "react";
import { TextInput } from "components/Base/Input/TextInput";
import { useHistory, useLocation } from "react-router-dom";
import { ISearchInputVM } from "./SearchInputVM";
import { parseLocationQSParams } from "utils/routerUtils";
import { observer } from "mobx-react";

export interface ISearchInputProps {
    searchInputVM: ISearchInputVM;
}

export const SearchInput: React.FC<ISearchInputProps> = observer(({ searchInputVM }) => {
    const { searchTerm, setSearchTerm, textIpnutVM } = searchInputVM;
    const history = useHistory();
    const location = useLocation();
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (searchTerm && e.nativeEvent.code === "Enter") {
            history.push(`/search?key=${searchTerm}`);
        }
    };

    const setKeyword = useCallback(
        (pathName: string, search: string) => {
            const qsParams = parseLocationQSParams(search);
            const keyWord = qsParams?.key;
            if (typeof keyWord === "string" && pathName === "/search") {
                setSearchTerm(keyWord);
            } else {
                setSearchTerm("");
            }
        },
        [setSearchTerm]
    );

    useEffect(() => {
        setKeyword(location.pathname, location.search);
    }, [location]);

    return <TextInput onKeyDown={onKeyDown} textInputVM={textIpnutVM} />;
});
