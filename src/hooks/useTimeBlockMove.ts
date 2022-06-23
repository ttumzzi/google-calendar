import { uniqueId } from "lodash";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { schedulePointerEventState, schedulesState } from "../recoil/atom";

const useTimeBlockMove = (dateKey: string) => {
  const [isMoving, setMoving] = useState(false);
  const [schedules, setSchedules] = useRecoilState(schedulesState);
  const [id, setId] = useState<string>("");
  const startTime = useRef<number>(0);
  const endTime = useRef<number>(0);
  const setDisabledPointerEvent = useSetRecoilState(schedulePointerEventState);

  useEffect(() => setId(uniqueId("schedule_")), []);

  const setNewSchedule = useCallback(() => {
    const currentDateSchedules = schedules[dateKey] || [];

    const index = currentDateSchedules.findIndex(
      (schedule) => schedule.id === id
    );

    let newSchedules;

    if (index === -1) {
      newSchedules = [
        ...currentDateSchedules,
        {
          id,
          startTime: startTime.current,
          endTime: endTime.current,
          title: "(제목없음)",
        },
      ];
    } else {
      newSchedules = [...currentDateSchedules];
      newSchedules[index] = {
        id,
        startTime: startTime.current,
        endTime: endTime.current,
        title: "(제목없음)",
      };
    }

    setSchedules({ ...schedules, [dateKey]: newSchedules });
  }, [dateKey, id, schedules, setSchedules]);

  const handleMouseDown = (event: MouseEvent<HTMLLIElement>) => {
    const element = event.target as HTMLLIElement;
    startTime.current = Number(element.dataset.time);
    endTime.current = startTime.current + 0.5;
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
