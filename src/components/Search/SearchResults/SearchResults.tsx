import { MovieLink } from "components/Base/MovieLink";
import { ErrorMessage } from "components/Error";
import { observer } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import { parseLocationQSParams } from "utils/routerUtils";
import { ISearchResultsVM } from "./SearchResultsVM";

export interface ISearchResultsProps {
    searchResultsVM: ISearchResultsVM;
}

export const SearchResults: React.FC<ISearchResultsProps> = observer(({ searchResultsVM }) => {
    const { setSearchTerm, searchResults, searchTerm } = searchResultsVM;
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
        <div className="search-results page-content">
            <Container>
                <h2>
                    Search: <span className="font-grey">{searchTerm}</span>
                </h2>
                {searchResults ? (
                    searchResults.length == 0 ? (
                        <div>No results</div>
                    ) : (
                        <div className="movie-grid">
                            <div className="movie-grid-items">
                                {searchResults.map((movie) => (
                                    <div className="movie-grid-item" key={movie.id}>
                                        <MovieLink
                                            className="movie-grid-item-link"
                                            id={movie.id}
                                            sourcePath={`${location.pathname}${location.search}`}
                                            sourceTitle="Search"
                                        >
                                            <img
                                                className="movie-grid-item-image"
                                                src={movie.posterPath}
                                                alt={movie.title}
                                            />
                                        </MovieLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ) : (
                    <ErrorMessage />
                )}
            </Container>
        </div>
    );
});
