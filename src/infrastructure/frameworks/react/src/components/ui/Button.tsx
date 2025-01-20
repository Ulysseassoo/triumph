import { MouseEventHandler, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: MouseEventHandler;
    variant?: "default" | "primary" | "secondary" | "destructive" | "outline";
    size?: string;
}
function Button({children,disabled,type,className,onClick,variant,size} : Props) {
    return (
        <button
        disabled = {disabled}
        type= {type}
        className= { `'' ?? ${className}`}
        onClick={onClick}
        variant={variant}
        size={`'' ?? ${size}`}
        >
             {children}
        </button>
    );
}

export default Button;