import React from "react";
import { useRecoilValue } from "recoil";
import { IModal } from "../../../interface/modal.interface";
import { modalListState } from "../../../recoil/modal.atom";
import Modal from "../Modal/Modal";
import "./ModalList.scss";

export interface Props {}

const ModalList: React.FC<Props> = (props: Props) => {
  const modalList = useRecoilValue(modalListState);

  if (modalList.length === 0) return <></>;

  return (
    <div className="dim-layer">
      {modalList.map((modal: IModal) => (
        <Modal key={modal.id}>{modal.component}</Modal>
      ))}
    </div>
  );
};

export default ModalList;
