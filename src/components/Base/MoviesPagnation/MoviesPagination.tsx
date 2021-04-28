import { observer } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { parseLocationQSParams } from "utils/routerUtils";
import { isNumeric } from "utils";
import { IMoviesPaginationVM } from "./MoviesPaginationVM";
import { Paginate } from "../Paginate";
import { Select } from "../Input/Select";
import { Label } from "reactstrap";
import { MovieLink } from "../MovieLink";

export interface IMoviesPaginationProps {
    pagePath: string;
    moviesPaginationVM: IMoviesPaginationVM;
    sourceTitle: string;
}

export const MoviesPagination: React.FC<IMoviesPaginationProps> = observer(
    ({ pagePath, moviesPaginationVM, sourceTitle }) => {
        const {
            setPage,
            loadCount,
            moviesForPage,
            moviesCount,
            pagesCount,
            page,
            sortBySelectVM,
        } = moviesPaginationVM;

        const location = useLocation();
        const setMoviePage = useCallback(
            (search: string) => {
                const qsParams = parseLocationQSParams(search);
                const page = qsParams?.page;
                if (typeof page === "string" && isNumeric(page)) {
                    setPage(parseInt(page as string));
                } else {
                    setPage(1);
                }
            },
            [moviesPaginationVM]
        );

        useEffect(() => {
            setMoviePage(location.search);
        }, [location, setMoviePage]);

        useEffect(() => {
            loadCount();
        }, []);

        return (
            <div className="movie-grid">
                <div className="movie-grid-select-block">
                    <div className="movie-grid-select">
                        <Label className="font-grey" for="sortby">
                            Sort By
                        </Label>
                        <Select id="sortby" selectVM={sortBySelectVM} />
                    </div>
                </div>

                <div className="movie-grid-items">
                    {moviesForPage.map((movie) => (
                        <div className="movie-grid-item" key={movie.id}>
                            <MovieLink
                                className="movie-grid-item-link"
                                id={movie.id}
                                sourcePath={`${location.pathname}${location.search}`}
                                sourceTitle={sourceTitle}
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
                {moviesCount && (
                    <div className="movie-grid-pagination">
                        <Paginate pagesCount={pagesCount} linkPath={pagePath} currentPage={page} />
                    </div>
                )}
            </div>
        );
    }
);
