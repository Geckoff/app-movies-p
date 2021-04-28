import { observer } from "mobx-react";
import React from "react";
import { IAllMoviesVM } from "./AllMoviesVM";
import { MoviesPagination } from "components/Base/MoviesPagnation/MoviesPagination";
import { Container } from "reactstrap";
import { PageContent } from "components/Layout";

export interface IAllMoviesProps {
    allMoviesVM: IAllMoviesVM;
}

export const AllMovies: React.FC<IAllMoviesProps> = observer(({ allMoviesVM }) => {
    return (
        <div className="all-movies-section">
            <Container>
                <PageContent>
                    <div className="all-movies">
                        <h2>All Movies</h2>
                        <div>
                            <MoviesPagination
                                moviesPaginationVM={allMoviesVM.moviesPaginationVM}
                                pagePath="/"
                            />
                        </div>
                    </div>
                </PageContent>
            </Container>
        </div>
    );
});
