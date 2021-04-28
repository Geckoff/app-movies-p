import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ITopMoviesVM } from "./TopMoviesVM";
import FontAwesome from "react-fontawesome";
import { LinkButton } from "components/Base/LinkButton";
import { Container } from "reactstrap";

export interface ITopMoviesProps {
    topMoviesVM: ITopMoviesVM;
}

export const TopMovies: React.FC<ITopMoviesProps> = observer(({ topMoviesVM }) => {
    useEffect(topMoviesVM.loadTopMovies, []);

    return (
        <div className="top-movies-section">
            <Container>
                <h2 className="top-movies-title">
                    <span className="font-grey">Movies:</span> Top 5
                </h2>
                <div className="top-movies">
                    {topMoviesVM.topMovies.map((topMovie) => (
                        <div key={topMovie.id} className="top-movie">
                            <div className="top-movie-image">
                                <Link to={`movie/${topMovie.id}`}>
                                    <img src={topMovie.posterPath} alt={topMovie.title} />
                                </Link>
                            </div>
                            <div className="top-movie-info">
                                <div className="top-movie-info-top">
                                    <h5 className="top-movie-title">{topMovie.title}</h5>
                                    <div className="top-movie-rating">
                                        <FontAwesome name="star" /> {topMovie.voteAverage}
                                    </div>
                                </div>
                                <div className="top-movie-genre">{topMovie.genres.join(", ")}</div>
                                <LinkButton
                                    className="top-movie-details-link"
                                    pathName={`movie/${topMovie.id}`}
                                >
                                    View Details
                                </LinkButton>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
});
