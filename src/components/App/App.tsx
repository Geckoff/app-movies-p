import React from "react";
import { Home } from "components/Home";
import { observer } from "mobx-react";
import { AppRoot } from "modules/AppRoot";
import { useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SingleMovie } from "components/SingleMovie";

export const App = observer(() => {
    const appRoot = useMemo(() => new AppRoot(), []);

    return (
        <>
            <Router>
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
                </Switch>
            </Router>
        </>
    );
});
