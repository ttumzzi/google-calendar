import React, { ReactNode } from "react";
import "./Modal.scss";

export interface Props {
  children: ReactNode;
}

const Modal: React.FC<Props> = (props: Props) => {
  return <div className="layer-container">{props.children}</div>;
};

export default Modal;
