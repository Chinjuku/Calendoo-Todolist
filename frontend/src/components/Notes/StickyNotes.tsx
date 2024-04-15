/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useEffect, useState, useContext } from "react";
import Bin from "/public/svg/bin.svg";
import { showDate } from "@/api/get/Notes/getDates";
import { UserContext } from "@/contexts/api-get/UserContext";
import { NoteData } from "@/composables/Validation.types";
import moment from "moment";
import { TbEdit } from "react-icons/tb";
// @ts-expect-error
import DatePagination from "react-date-pagination";
import { queryDate } from "@/api/get/Notes/queryDate";
import { showNotes } from "@/api/get/Notes/getNote";
import { Button } from "../ui/button";
import { UpdateNote } from "./UpdateNote";

const StickyNotes = () => {
  const [date, setDate] = useState<NoteData[] | null>(null);
  const [note, setNote] = useState<NoteData[] | null>(null);
  const [allnotes, setAllNotes] = useState<NoteData[] | null>(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const fetchDate = await showDate(user?.id);
      setDate(fetchDate);
      const fetchAllNote = await showNotes(user?.id);
      setAllNotes(fetchAllNote);
    };
    fetchData();
  }, [user?.id]);

  const [activePage, setActivePage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const daysArray =
    date?.map((date) => ({ date: moment(date.date).format("YYYY-MM-DD") })) ||
    [];
  daysArray.push({ date: "" });
  const handlePageChange = async (pageNumber: number) => {
    setActivePage(pageNumber);
    const date = new Date(daysArray?.[pageNumber - 1].date).toLocaleDateString(
      "en-US",
      { timeZone: "America/Los_Angeles" }
    );
    const dateFormat = moment(date).format("YYYY-MM-DD");
    const result = await queryDate(user?.id, dateFormat);
    setNote(result);
  };
  const showModal = (id: string) => {
    const open: any = document.getElementById(`my_modal_${id}`)
    console.log(id);
    open.showModal()
  }

  return (
    <div className="py-[15px] px-[30px] w-[71%]">
      <div className="flex justify-between">
        <h1 className="Second text-[40px]">Sticky Wall</h1>
        <div className="flex gap-5">
          <DatePagination
            activePage={activePage}
            itemsCountPerPage={1} // Assuming each page shows one day
            totalItemsCount={daysArray?.length}
            days={daysArray}
            pageRangeDisplayed={1}
            onChange={handlePageChange}
          />
          <Button className="mt-4" onClick={() => setNote(null)}>
            Show All Notes
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 p-3 pr-5 auto-rows-max gap-4 h-[95%] overflow-auto">
        {/* Mapping Query Data per day */}
        {note ? note.map((data) => (
              <div
                className="rounded-[12px] w-full h-[200px] relative p-4"
                style={{ backgroundColor: `${data.list.color}` }}
              >
                <h1 className="text-[28px]">{data.title}</h1>
                <p>{data.description}</p>
                <p className="absolute bottom-8 left-2">
                  Time: {moment(data.time).format("HH:mm")}
                </p>
                <p className="absolute bottom-2 left-2">
                  Date: {moment(data.date).format("YYYY-MM-DD")}
                </p>
                <button
                  onClick={() => showModal(data.id)}
                >
                  <p>{data.id}</p>
                  <TbEdit className="absolute bottom-2 right-[42px] w-8 h-8" />
                </button>
                <dialog id={`my_modal_${data.id}`} className="modal bg-opacity-65">
                  <UpdateNote
                    title={data.title}
                    description={data.description}
                    list= {{
                      namelist : data.list.namelist,
                      color: data.list.color,
                      id: data.list.id
                    }}
                    id={data.id}
                    date={data.date}
                    time={data.time}
                    piority={data.piority}
                    userId={data.userId}
                  />
                </dialog>
                <button>
                  <img
                    className="absolute bottom-3 right-2 w-7 h-7 font-bold"
                    src={Bin}
                    alt=""
                  />
                </button>
              </div>
            ))
          : allnotes?.map((item) => (
              <div
                className="rounded-[12px] w-full h-[200px] relative p-4"
                style={{ backgroundColor: `${item.list.color}` }}
              >
                <h1 className="text-[28px]">{item.title}</h1>
                <p>{item.description}</p>
                <p className="absolute bottom-8 left-2">
                  Time: {moment(item.time).format("HH:mm")}
                </p>
                <p className="absolute bottom-2 left-2">
                  Date: {moment(item.date).format("YYYY-MM-DD")}
                </p>
                <p>{item.id}</p>
                <button
                  onClick={() => showModal(item.id)}
                >
                  <TbEdit className="absolute bottom-2 right-[42px] w-8 h-8" />
                </button>
                <dialog id={`my_modal_${item.id}`} className="modal bg-opacity-65">
                  <UpdateNote  
                    title={item.title}
                    description={item.description}
                    list= {{
                      namelist : item.list.namelist,
                      color: item.list.color,
                      id: item.list.id
                    }}
                    id={item.id}
                    date={item.date}
                    time={item.time}
                    piority={item.piority}
                    userId={item.userId}
                  />
                </dialog>
                <button>
                  <img
                    className="absolute bottom-3 right-2 w-7 h-7 font-bold"
                    src={Bin}
                    alt=""
                  />
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default StickyNotes;
