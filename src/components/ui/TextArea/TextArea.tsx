import React from "react";

import "./TextArea.css";

interface Props {
  label?: string;
  onChange?: (e: any) => void;
}

export const TextArea: React.FC<Props> = ({ label, onChange }) => (
  <>
    <label htmlFor="textarea">{label}</label>
    <textarea onChange={onChange} className="textarea" id="textarea"></textarea>
  </>
);
