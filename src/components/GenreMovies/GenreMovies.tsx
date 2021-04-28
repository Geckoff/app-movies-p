import { observer } from "mobx-react";
import React from "react";
import { MoviesPagination } from "components/Base/MoviesPagnation/MoviesPagination";
import { IGenreMoviesVM } from "./GenreMoviesVM";
import { match } from "react-router";
import { Container } from "reactstrap";
import { ErrorMessage } from "components/Error";

export interface IGenreMoviesProps {
    genreMoviesVMs: { [key: string]: IGenreMoviesVM };
    match?: match<{ id?: string | undefined }>;
}

export const GenreMovies: React.FC<IGenreMoviesProps> = observer(({ match, genreMoviesVMs }) => {
    const genreParam = match?.params.id;
    const genreMoviesVM = genreParam && genreMoviesVMs[genreParam];

    return (
        <div className="genre page-content">
            <Container>
                {genreMoviesVM ? (
                    <div>
                        <h2 className="genre-title">{genreParam}</h2>
                        <div>
                            <MoviesPagination
                                moviesPaginationVM={genreMoviesVM.moviesPaginationVM}
                                pagePath={`/genre/${genreParam}`}
                            />
                        </div>
                    </div>
                ) : (
                    <ErrorMessage />
                )}
            </Container>
        </div>
    );
});
