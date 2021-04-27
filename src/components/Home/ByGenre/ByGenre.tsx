import React from "react";
import { Link } from "react-router-dom";

export const ByGenre: React.FC = () => {
    return (
        <div>
            <h2>By Genre</h2>
            <div>
                <Link to={`genre/comedy`}>Comedy</Link>
            </div>
            <div>
                <Link to={`genre/action`}>Action</Link>
            </div>
            <div>
                <Link to={`genre/drama`}>Drama</Link>
            </div>
            <div>
                <Link to={`genre/true_crime`}>True Crime</Link>
            </div>
        </div>
    );
};
