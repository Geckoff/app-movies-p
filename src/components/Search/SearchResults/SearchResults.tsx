import { observer } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { parseLocationQSParams } from "utils/routerUtils";
import { ISearchResultsVM } from "./SearchResultsVM";

export interface ISearchResultsProps {
    searchResultsVM: ISearchResultsVM;
}

export const SearchResults: React.FC<ISearchResultsProps> = observer(({ searchResultsVM }) => {
    const { setSearchTerm, searchResults } = searchResultsVM;
    const location = useLocation();
    const setSearchKeyword = useCallback(
        (search: string) => {
            const qsParams = parseLocationQSParams(search);
            const key = qsParams?.key;
            if (typeof key === "string") {
                setSearchTerm(key);
            } else {
                setSearchTerm(null);
            }
        },
        [setSearchTerm]
    );

    useEffect(() => {
        setSearchKeyword(location.search);
    }, [location, setSearchKeyword]);

    return (
        <div>
            <h2>Search</h2>
            {searchResults ? (
                searchResults.map((movie) => <div key={movie.id}>{movie.title}</div>)
            ) : (
                <div>Bad!</div>
            )}
        </div>
    );
});
