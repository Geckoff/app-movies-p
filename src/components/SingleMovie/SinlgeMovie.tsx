import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { match } from "react-router";
import { isNumeric } from "utils";
import { ISingleMovieVM } from "./SingleMovieVM";
import { Container } from "reactstrap";
import FontAwesome from "react-fontawesome";
import { ErrorMessage } from "components/Error";
import { useLocation } from "react-router-dom";
import { BackLink } from "components/Base/BackLink";

export interface ISingleMovieProps {
    singleMovieVM: ISingleMovieVM;
    match: match<{ id?: string | undefined }>;
}

export const SingleMovie: React.FC<ISingleMovieProps> = observer(({ singleMovieVM, match }) => {
    useEffect(() => {
        const idParam = match.params.id;
        const id = typeof idParam === "string" && isNumeric(idParam) ? parseInt(idParam) : 0;
        singleMovieVM.loadMovie(id);
    }, []);
    const movie = singleMovieVM.movie;

    const location = useLocation<{
        sourcePath: string;
        sourceTitle: string;
    }>();
    console.log(location.state?.sourcePath, location.state?.sourceTitle);

    return (
        <div className="single-movie page-content">
            <Container>
                {movie ? (
                    <>
                        <div className="single-movie-back-link">
                            <BackLink
                                toUrl={location.state?.sourcePath || "/"}
                                toTitle={location.state?.sourceTitle || "Home"}
                            />
                        </div>

                        <div className="single-movie-main">
                            <div className="single-movie-image-block">
                                <img className="single-movie-image" src={movie.posterPath} alt="" />
                            </div>
                            <div className="single-movie-info">
                                <div className="single-movie-info-rating">
                                    <FontAwesome name="star" /> {movie.voteAverage}{" "}
                                    <span className="single-movie-info-rating-small font-grey">
                                        /10
                                    </span>
                                </div>
                                <div className="single-movie-info-title">
                                    <h3>
                                        {movie.title}{" "}
                                        <span className="font-grey single-movie-info-title-year">
                                            ({movie.releaseDate.substr(0, 4)})
                                        </span>
                                    </h3>
                                </div>
                                <div className="single-movie-info-genre">
                                    {movie.genres.join(", ")}
                                </div>
                                <div className="single-movie-info-director">
                                    Director: {movie.director.name}
                                </div>
                                <div className="single-movie-info-description">
                                    {movie.overview}
                                </div>
                            </div>
                        </div>

                        <div className="single-movie-cast">
                            <h5 className="single-movie-cast-title">Cast</h5>
                            <div className="single-movie-actors">
                                {movie.cast.map((actor, i) => (
                                    <div key={i} className="single-movie-actor">
                                        <div className="single-movie-actor-image">
                                            <img src={actor.profilePath} alt={actor.name} />
                                        </div>
                                        <div className="single-movie-actor-name">{actor.name}</div>
                                        <div className="single-movie-actor-character">
                                            <span className="font-grey"> {actor.character}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <ErrorMessage />
                )}
            </Container>
        </div>
    );
});
