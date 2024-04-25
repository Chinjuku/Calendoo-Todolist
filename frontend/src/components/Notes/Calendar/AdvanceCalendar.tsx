"use client";
import moment from "moment";
import Calendar from "../../Calendar/Calendar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/api-get/UserContext";
import { NoteData } from "@/composables/React.types";
import { showNotes } from "@/api/get/Notes/getNote";
import { useQuery } from "@tanstack/react-query";
import { LoadData } from "@/components/LoadData";

const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: (props: any) => {
    const eventType = props?.event?.data?.color;
    return (
      <div style={{ background: eventType, color: "white", height: "100%" }}>
        {props.event.title}
      </div>
    );
  },
};

export default function ControlCalendar() {
  const [allnotes, setAllNotes] = useState<NoteData[] | null>(null);
  const { user } = useContext(UserContext);
  const userId = user?.id ?? "";
  const { data: showallnote, isLoading: showallnoteLoading } = useQuery({
    queryKey: ["showallnote"],
    queryFn: () => showNotes(userId),
    enabled: !!userId,
  });
  useEffect(() => {
    if (showallnote) setAllNotes(showallnote);
  }, [showallnote]);
  const events = allnotes?.map((data: NoteData) => {
    return {
      title: data.title,
      start: moment(data.starttime).toDate(),
      end: moment(data.endtime).toDate(),
      data: {
        listId: data.list.id,
        namelist: data.list.namelist,
        color: data.list.color,
      },
    };
  });

  return (
    <>
      { showallnoteLoading ? <LoadData /> :
        <Calendar
          className="w-[70%] p-10"
          events={events}
          components={components}
        />
      }
    </>
  );
}
