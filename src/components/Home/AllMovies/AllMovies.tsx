import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Pagination from "react-paginate";
import { Link } from "react-router-dom";
import { IAllMoviesVM } from "./AllMoviesVM";

export interface IAllMoviesProps {
    allMoviesVM: IAllMoviesVM;
}

export const AllMovies: React.FC<IAllMoviesProps> = observer(({ allMoviesVM }) => {
    useEffect(allMoviesVM.loadMovies, [allMoviesVM.page]);

    const handlePageClick = (data: { selected: number }) => {
        allMoviesVM.setPage(data.selected);
    };

    return (
        <div>
            <h2>All movies</h2>
            {allMoviesVM.moviesForPage.map((movie) => (
                <div key={movie.id}>
                    <Link to={`movie/${movie.id}`}>{movie.title}</Link>
                </div>
            ))}
            <Pagination
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={10}
                initialPage={allMoviesVM.page}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
});
