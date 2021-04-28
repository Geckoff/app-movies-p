import { observer } from "mobx-react";
import React from "react";
import { ITextInputVM } from "./TextInputVM";

export interface ITextInputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    textInputVM: ITextInputVM;
}

export const TextInput: React.FC<ITextInputProps> = observer(({ textInputVM, ...props }) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        textInputVM.onChange(e.target.value);
    };

    return (
        <input
            className="text-input"
            type="text"
            onChange={onChange}
            value={textInputVM.value}
            {...props}
        />
    );
});
