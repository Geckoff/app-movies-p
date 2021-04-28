import { observer } from "mobx-react";
import React from "react";
import FontAwesome from "react-fontawesome";
import { INetworkActivityIndicatorVM } from "./NetworkActivityIndicatorVM";

export interface INetworkActivityIndicatorProps {
    networkActivityIndicatorVM: INetworkActivityIndicatorVM;
}

export const NetworkActivityIndicator: React.FC<INetworkActivityIndicatorProps> = observer(
    ({ networkActivityIndicatorVM }) => (
        <>
            {networkActivityIndicatorVM.hasNetworkActivity && (
                <div className="network-activity-indicator">
                    <FontAwesome name="spinner" spin />
                </div>
            )}
        </>
    )
);
