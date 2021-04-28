import { observer } from "mobx-react";
import React from "react";
import { Input, InputProps } from "reactstrap";
import { ISelectVM } from "./SelectVM";

export interface ISelectProps extends InputProps {
    selectVM: ISelectVM;
}

export const Select: React.FC<ISelectProps> = observer(({ selectVM, ...props }) => {
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        selectVM.onChange(e.target.value);
    };

    return (
        <Input
            {...props}
            className="select-input"
            type="select"
            onChange={onChange}
            value={selectVM.value}
        >
            {selectVM.options.map((option, i) => (
                <option key={i} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Input>
    );
});
