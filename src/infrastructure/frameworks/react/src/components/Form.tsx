import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}
export const InputField = ({children,className} : Props) : JSX.Element => {
    return (
        <InputField className={`"" ?? ${className}`}> { children} </InputField>
    );
};
export const SelectField =({children,className} : Props) : JSX.Element => {
    return (
        <SelectField className={`"" ?? ${className}`}> { children}</SelectField>
    )
};


export const RadioGroup = ({children,className} : Props) : JSX.Element => {
    return (
        <RadioGroup className={`"" ?? ${className}`}> { children} </RadioGroup>
    );
};
