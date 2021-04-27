import React from "react";
import { Link } from "react-router-dom";

export interface IPaginateProps {
    pagesCount: number;
    currentPage: number;
    linkPath: string;
}

export const Paginate = ({ pagesCount, currentPage, linkPath }: IPaginateProps) => {
    return (
        <ul className="paginate">
            {currentPage !== 1 && <Link to={`${linkPath}?page=${currentPage - 1}`}>Previous</Link>}
            {Array(pagesCount)
                .fill(0)
                .map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                        <li key={pageNumber}>
                            {currentPage === pageNumber ? "cur" : ""}
                            <Link to={`${linkPath}?page=${pageNumber}`}>{pageNumber}</Link>
                        </li>
                    );
                })}
            {currentPage < pagesCount && (
                <Link to={`${linkPath}?page=${currentPage + 1}`}>Next</Link>
            )}
        </ul>
    );
};
