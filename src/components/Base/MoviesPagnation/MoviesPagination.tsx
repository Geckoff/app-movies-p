import { observer } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { parseLocationQSParams } from "utils/routerUtils";
import { isNumeric } from "utils";
import { IMoviesPaginationVM } from "./MoviesPaginationVM";
import { Paginate } from "../Paginate";
import { Select } from "../Input/Select";
import { Label } from "reactstrap";

export interface IMoviesPaginationProps {
    pagePath: string;
    moviesPaginationVM: IMoviesPaginationVM;
}

export const MoviesPagination: React.FC<IMoviesPaginationProps> = observer(
    ({ pagePath, moviesPaginationVM }) => {
        const {
            setPage,
            loadCount,
            moviesForPage,
            moviesCount,
            pagesCount,
            page,
            sortBySelectVM,
            sortBy,
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
                            <Link className="movie-grid-item-link" to={`/movie/${movie.id}`}>
                                <img
                                    className="movie-grid-item-image"
                                    src={movie.posterPath}
                                    alt={movie.title}
                                />
                            </Link>
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
