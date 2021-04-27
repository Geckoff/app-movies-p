import { observer } from "mobx-react";
import React from "react";
import { ISelectVM } from "./SelectVM";

export interface ISelectProps
    extends React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    > {
    selectVM: ISelectVM;
}

export const Select: React.FC<ISelectProps> = observer(({ selectVM, ...props }) => {
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectVM.onChange(e.target.value);
    };

    return (
        <select onChange={onChange} value={selectVM.value} {...props}>
            {selectVM.options.map((option, i) => (
                <option key={i} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});
