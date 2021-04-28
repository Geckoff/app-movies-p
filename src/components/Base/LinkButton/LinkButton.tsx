import React from "react";
import { Link } from "react-router-dom";
import { appendCssClass } from "utils";

export interface ILinkButtonProps {
    pathName: string;
    className?: string;
}

export const LinkButton: React.FC<ILinkButtonProps> = ({ children, className, pathName }) => {
    const composedClassName = appendCssClass("link-button", className);

    return (
        <Link className={composedClassName} to={pathName}>
            {children}
        </Link>
    );
};
