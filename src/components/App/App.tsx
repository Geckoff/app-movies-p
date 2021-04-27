import React from "react";
import { Home } from "components/Home";
import { observer } from "mobx-react";
import { AppRoot } from "modules/AppRoot";
import { useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SingleMovie } from "components/SingleMovie";
import { GenreMovies } from "components/GenreMovies";
import { SearchResults } from "components/Search/SearchResults";
import { SearchInput } from "components/Search/SearchInput";
import { NetworkActivityIndicator } from "components/NetworkActivityIndicator";

export const App = observer(() => {
    const appRoot = useMemo(() => new AppRoot(), []);

    return (
        <>
            <NetworkActivityIndicator
                networkActivityIndicatorVM={appRoot.networkActivityIndicatorVM}
            />
            <Router>
                <SearchInput searchInputVM={appRoot.searchInputVM} />
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => <Home {...props} homeVM={appRoot.homeVM} />}
                    />
                    <Route
                        path="/movie/:id"
                        exact
                        render={(props) => (
                            <SingleMovie {...props} singleMovieVM={appRoot.singleMovieVM} />
                        )}
                    />
                    <Route
                        path="/genre/:id"
                        exact
                        render={(props) => (
                            <GenreMovies {...props} genreMoviesVMs={appRoot.genreVMs} />
                        )}
                    />
                    <Route
                        path="/search"
                        exact
                        render={(props) => (
                            <SearchResults {...props} searchResultsVM={appRoot.searchResultsVM} />
                        )}
                    />
                </Switch>
            </Router>
        </>
    );
});
