import { atom } from "recoil";
import { IModal } from "../interface/modal.interface";

export const modalListState = atom<IModal[]>({
  key: "modalListState",
  default: [],
});
