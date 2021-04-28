import FontAwesome from "react-fontawesome";
import { ISearchInputVM, SearchInput } from "components/Search/SearchInput";
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

export interface IHeaderProps {
    searchInputVM: ISearchInputVM;
}

export const Header: React.FC<IHeaderProps> = ({ searchInputVM }) => (
    <div className="header-wrapper">
        <Container>
            <header className="header">
                <div className="header-left">
                    <Link className="header-left-logo" to="/">
                        <FontAwesome name="film" />
                    </Link>
                    <span className="header-left-title">Reel Cinema</span>
                </div>
                <div className="header-right">
                    <SearchInput searchInputVM={searchInputVM} />
                </div>
            </header>
        </Container>
    </div>
);
