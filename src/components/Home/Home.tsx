import React from "react";
import { observer } from "mobx-react-lite";
import { IHomeVM } from "./HomeVM";
import { TopMovies } from "./TopMovies";
import { AllMovies } from "./AllMovies";
import { ByGenre } from "./ByGenre";

export interface IHomeProps {
    homeVM: IHomeVM;
}

export const Home: React.FC<IHomeProps> = observer(({ homeVM }) => {
    return (
        <div className="home">
            <TopMovies topMoviesVM={homeVM.topMoviesVM} />
            <ByGenre />
            <AllMovies allMoviesVM={homeVM.allMoviesVM} />
        </div>
    );
});
