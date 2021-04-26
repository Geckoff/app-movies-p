import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ITopMoviesVM } from "./TopMoviesVM";

export interface ITopMoviesProps {
    topMoviesVM: ITopMoviesVM;
}

export const TopMovies: React.FC<ITopMoviesProps> = observer(({ topMoviesVM }) => {
    useEffect(topMoviesVM.loadTopMovies, []);

    return (
        <div>
            {topMoviesVM.topMovies.map((topMovie) => (
                <div key={topMovie.id}>
                    <Link to={`movie/${topMovie.id}`}>{topMovie.title}</Link>
                </div>
            ))}
        </div>
    );
});
