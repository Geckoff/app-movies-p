import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

export const ByGenre: React.FC = () => {
    return (
        <div className="by-genre-section">
            <Container>
                <div className="by-genre">
                    <span className="by-genre-browse font-grey">Browse</span>
                    <h2>by Genre</h2>
                    <div className="by-genre-genres">
                        <div className="by-genre-genre">
                            <Link className="by-genre-genre-link" to={`genre/comedy`}>
                                Comedy
                            </Link>
                        </div>
                        <div className="by-genre-genre">
                            <Link className="by-genre-genre-link" to={`genre/action`}>
                                Action
                            </Link>
                        </div>
                        <div className="by-genre-genre">
                            <Link className="by-genre-genre-link" to={`genre/drama`}>
                                Drama
                            </Link>
                        </div>
                        <div className="by-genre-genre">
                            <Link className="by-genre-genre-link" to={`genre/crime`}>
                                Crime
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
