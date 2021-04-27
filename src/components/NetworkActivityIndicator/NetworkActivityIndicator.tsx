import { observer } from "mobx-react";
import React from "react";
import { INetworkActivityIndicatorVM } from "./NetworkActivityIndicatorVM";

export interface INetworkActivityIndicatorProps {
    networkActivityIndicatorVM: INetworkActivityIndicatorVM;
}

export const NetworkActivityIndicator: React.FC<INetworkActivityIndicatorProps> = observer(
    ({ networkActivityIndicatorVM }) => (
        <div>{networkActivityIndicatorVM.hasNetworkActivity && <h2>Loading...</h2>}</div>
    )
);
