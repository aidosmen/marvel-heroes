import React from "react";
import "./Input.css";

interface Props {
  search?: boolean;
  label?: string;
  typeFile?: boolean;
  onChange?: (e: any) => void;
  required?: boolean;
  value?: string;
}

export const Input: React.FC<Props> = ({
  search,
  label,
  typeFile = false,
  onChange,
  required,
  value,
}) => (
  <>
    <label htmlFor="label">{label}</label>
    <input
      required={required}
      className={"input " + (search ? "search" : "")}
      type={typeFile ? "file" : "text"}
      id="label"
      onChange={onChange}
      value={value}
    />
  </>
);
