import { observer } from "mobx-react";
import React from "react";
import { IAllMoviesVM } from "./AllMoviesVM";
import { MoviesPagination } from "components/Base/MoviesPagnation/MoviesPagination";

export interface IAllMoviesProps {
    allMoviesVM: IAllMoviesVM;
}

export const AllMovies: React.FC<IAllMoviesProps> = observer(({ allMoviesVM }) => {
    return (
        <div>
            <h2>All Movies</h2>
            <div>
                <MoviesPagination
                    moviesPaginationVM={allMoviesVM.moviesPaginationVM}
                    pagePath="/"
                />
            </div>
        </div>
    );
});
