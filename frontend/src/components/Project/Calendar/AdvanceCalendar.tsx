"use client";
import moment from "moment";
import Calendar from "@/components/Calendar/Calendar";
import { useEffect, useState } from "react";
import { NoteData } from "@/composables/React.types";
import { useQuery } from "@tanstack/react-query";
import { LoadData } from "@/components/LoadData";
import { showAllTaskLists } from "@/api/get/TaskList/getTaskLists";
import { useParams } from "react-router-dom";

const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: (props: any) => {
    const eventType = props?.event?.boardcolor;
    return (
      <div style={{ background: eventType, color: "white", height: "100%" }}>
        {props.event.title}
      </div>
    );
  },
};

export default function ControlCalendar() {
  const { projectId } = useParams();
  const [alltasks, setAllTasks] = useState<NoteData[] | null>(null);
  const { data: showalltask, isLoading: showalltaskLoading } = useQuery({
    queryKey: ["showalltask"],
    queryFn: () => showAllTaskLists(projectId),
    enabled: !!projectId,
  });
  useEffect(() => {
    if (showalltask) setAllTasks(showalltask);
  }, [showalltask]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events = alltasks?.map((data: any) => {
    return ({
        title : data.title,
        start : moment(data.createdAt).toDate(),
        end : moment(data.setdate).toDate(),
        boardcolor : data.task.board.color
      })
    });

  return (
    <>
      { showalltaskLoading ? <LoadData /> :
        <Calendar
          className="w-[85%] p-10"
          events={events}
          components={components}
        />
      }
    </>
  );
}
