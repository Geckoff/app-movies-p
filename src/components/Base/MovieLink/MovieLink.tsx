import React from "react";
import { Link } from "react-router-dom";

export interface IMovieLinkProps {
    id: number;
    sourcePath?: string;
    sourceTitle?: string;
    className?: string;
}

export const MovieLink: React.FC<IMovieLinkProps> = ({
    className,
    id,
    children,
    sourcePath,
    sourceTitle,
}) => {
    return (
        <Link
            className={className || ""}
            to={{
                pathname: `/movie/${id}`,
                state: { sourcePath, sourceTitle },
            }}
        >
            {children}
        </Link>
    );
};
