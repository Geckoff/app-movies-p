import { observer } from "mobx-react";
import React from "react";
import { IAllMoviesVM } from "./AllMoviesVM";
import { MoviesPagination } from "components/Base/MoviesPagnation/MoviesPagination";
import { Container } from "reactstrap";

export interface IAllMoviesProps {
    allMoviesVM: IAllMoviesVM;
}

export const AllMovies: React.FC<IAllMoviesProps> = observer(({ allMoviesVM }) => {
    return (
        <div className="all-movies-section">
            <Container>
                <div className="all-movies">
                    <span className="all-movies-movies font-grey">Movies</span>
                    <h2 className="all-movies-title">Browse All</h2>
                    <div>
                        <MoviesPagination
                            moviesPaginationVM={allMoviesVM.moviesPaginationVM}
                            pagePath="/"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
});
