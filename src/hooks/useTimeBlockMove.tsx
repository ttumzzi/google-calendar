import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { schedulePointerEventState, schedulesState } from "../recoil/date.atom";
import useModal from "./useModal";
import ScheduleModal from "../components/modal/ScheduleModal/ScheduleModal";
import { IDateInfo, ISchedule } from "../interface/date.interface";
import { getDateKey } from "../utils/date";

const useTimeBlockMove = ({ year, month, date }: IDateInfo) => {
  const [isMoving, setMoving] = useState(false);
  const setSchedules = useSetRecoilState(schedulesState);
  const id = useRef<string>("");
  const startTime = useRef<number>(0);
  const endTime = useRef<number>(0);
  const setDisabledPointerEvent = useSetRecoilState(schedulePointerEventState);
  const { getModalId, openModal, closeModal } = useModal();

  const dateKey = getDateKey(year, month, date);

  const setNewSchedule = useCallback(() => {
    setSchedules((prev) => {
      const currentDateSchedules = prev[dateKey] || [];
      const index = currentDateSchedules.findIndex(
        (schedule) => schedule.id === id.current
      );

      let newSchedules: ISchedule[];
      const newSchedule: ISchedule = {
        id: id.current,
        startTime: startTime.current,
        endTime: endTime.current,
        title: "(제목없음)",
      };

      if (index === -1) {
        newSchedules = [...currentDateSchedules, newSchedule];
      } else {
        newSchedules = [...currentDateSchedules];
        newSchedules[index] = newSchedule;
      }

      return { ...prev, [dateKey]: newSchedules };
    });
  }, [dateKey, setSchedules]);

  const handleMouseDown = (newId: string, event: MouseEvent<HTMLLIElement>) => {
    const element = event.target as HTMLLIElement;
    startTime.current = Number(element.dataset.time);
    endTime.current = startTime.current + 0.5;
    id.current = newId;
    setNewSchedule();
    setMoving(true);
    setDisabledPointerEvent("none");
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isMoving) return;

      endTime.current = Number((event.target as HTMLLinkElement).dataset.time);
      setNewSchedule();
    },
    [isMoving, setNewSchedule]
  );

  const handleMouseUp: any = useCallback(() => {
    setMoving(false);
    setDisabledPointerEvent("auto");

    const modalId = getModalId();
    const props = {
      year,
      month,
      date,
      id: id.current,
      startTime: startTime.current,
      endTime: endTime.current,
      title: "",
    };
    const component = (
      <ScheduleModal {...props} closeModal={closeModal.bind(null, modalId)} />
    );
    openModal(modalId, component);
  }, []);

  useEffect(() => {
    if (isMoving) {
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [isMoving, handleMouseUp]);

  return { handleMouseDown, handleMouseMove };
};

export default useTimeBlockMove;
