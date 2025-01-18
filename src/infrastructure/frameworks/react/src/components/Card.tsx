import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}



export const Card = ({ children, className }: Props): JSX.Element => {
  return (
    <div className={`border border-gray-200 rounded-lg shadow-md p-4 bg-white max-w-md mx-auto ${className || ""}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: Props): JSX.Element => {
  return (
    <div className={`border-b border-gray-200 pb-2 mb-3 ${className || ""}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }: Props): JSX.Element => {
  return (
    <h2 className={`text-2xl font-bold m-0 ${className || ""}`}>
      {children}
    </h2>
  );
};

export const CardDescription = ({ children, className }: Props): JSX.Element => {
  return (
    <p className={`text-base text-gray-600 my-2 ${className || ""}`}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className }: Props): JSX.Element => {
  return (
    <div className={`text-base my-2 ${className || ""}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className }: Props): JSX.Element => {
  return (
    <div className={`border-t border-gray-200 pt-2 mt-3 text-right ${className || ""}`}>
      {children}
    </div>
  );
};