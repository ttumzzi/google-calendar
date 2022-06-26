import { uniqueId } from "lodash";
import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { modalListState } from "../recoil/modal.atom";

const useModal = () => {
  const [modalList, setModalList] = useRecoilState(modalListState);

  const getModalId = () => {
    return uniqueId("modal_");
  };

  const openModal = (id: string, component: ReactNode) => {
    setModalList([...modalList, { id, component }]);
  };

  const closeModal = (id: string) => {
    setModalList((prev) => {
      const newModalList = [...prev];
      const index = newModalList.findIndex((modal) => modal.id === id);

      if (index !== -1) {
        newModalList.splice(index, 1);
      }
      return newModalList;
    });
  };

  return { getModalId, openModal, closeModal };
};

export default useModal;
