import { MouseEventHandler, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: MouseEventHandler;
    variant?: "default" | "primary" | "secondary";
}
function Button({children,disabled,type,className,onClick,variant} : Props) {
    return (
        <button
        disabled = {disabled}
        type= {type}
        className= { `'' ?? ${className}`}
        onClick={onClick}
        variant={variant}
        >
             {children}
        </button>
    );
}

export default Button;