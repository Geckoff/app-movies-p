import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IHomeVM } from "./HomeVM";
import { TopMovies } from "./TopMovies";
import { AllMovies } from "./AllMovies";

export interface IHomeProps {
    homeVM: IHomeVM;
}

export const Home: React.FC<IHomeProps> = observer(({ homeVM }) => {
    return (
        <div>
            <TopMovies topMoviesVM={homeVM.topMoviesVM} />
            <AllMovies allMoviesVM={homeVM.allMoviesVM} />
        </div>
    );
});
