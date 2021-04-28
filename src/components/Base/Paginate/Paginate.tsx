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
            {currentPage !== 1 && (
                <li className="paginate-item paginate-item-prev">
                    <Link to={`${linkPath}?page=${currentPage - 1}`}>Previous</Link>
                </li>
            )}
            {Array(pagesCount)
                .fill(0)
                .map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                        <li
                            className={`paginate-item ${
                                currentPage === pageNumber ? "paginate-item-active" : ""
                            }`}
                            key={pageNumber}
                        >
                            <Link to={`${linkPath}?page=${pageNumber}`}>{pageNumber}</Link>
                        </li>
                    );
                })}
            {currentPage < pagesCount && (
                <li className="paginate-item paginate-item-next">
                    <Link to={`${linkPath}?page=${currentPage + 1}`}>Next</Link>
                </li>
            )}
        </ul>
    );
};
