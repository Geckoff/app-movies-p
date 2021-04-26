import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { match } from "react-router";
import { isNumeric } from "utils";
import { ISingleMovieVM } from "./SingleMovieVM";

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

    return <div>{singleMovieVM.movie && singleMovieVM.movie.title}</div>;
});
