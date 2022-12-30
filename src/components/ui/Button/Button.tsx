import React from "react";
import "./Button.css";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, onClick, className, type }) => (
  <button type={type} className={"button " + className} onClick={onClick}>
    {children}
  </button>
);
