import React from "react";

import { Button } from "../Button/Button";
import "./PopUp.css";

interface Props {
  trigger: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

export const PopUp: React.FC<Props> = ({ trigger, children, onClick }) => {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Button className="close-btn" onClick={onClick}>
          close
        </Button>
        {children}
      </div>
    </div>
  ) : null;
};
