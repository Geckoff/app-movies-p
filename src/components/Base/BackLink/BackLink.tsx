import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";

export interface IBackLinkProps {
    toUrl: string;
    toTitle: string;
}

export const BackLink: React.FC<IBackLinkProps> = ({ toUrl, toTitle }) => {
    return (
        <Link className="font-grey link-back" to={toUrl}>
            <FontAwesome name="arrow-left" /> {toTitle}
        </Link>
    );
};
