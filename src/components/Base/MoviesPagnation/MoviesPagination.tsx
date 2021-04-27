import { observer } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { parseLocationQSParams } from "utils/routerUtils";
import { isNumeric } from "utils";
import { IMoviesPaginationVM } from "./MoviesPaginationVM";
import { Paginate } from "../Paginate";
import { Select } from "../Input/Select";

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
            <div>
                {sortBy}
                <Select selectVM={sortBySelectVM} />
                {moviesForPage.map((movie) => (
                    <div key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                    </div>
                ))}
                {moviesCount && (
                    <Paginate pagesCount={pagesCount} linkPath={pagePath} currentPage={page} />
                )}
            </div>
        );
    }
);
