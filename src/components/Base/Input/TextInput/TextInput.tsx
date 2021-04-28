import { observer } from "mobx-react";
import React from "react";
import { Input, InputProps } from "reactstrap";
import { ITextInputVM } from "./TextInputVM";

export interface ITextInputProps extends InputProps {
    textInputVM: ITextInputVM;
}

export const TextInput: React.FC<ITextInputProps> = observer(({ textInputVM, ...props }) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        textInputVM.onChange(e.target.value);
    };

    return (
        <Input
            className="text-input"
            type="text"
            onChange={onChange}
            value={textInputVM.value}
            {...props}
        />
    );
});
