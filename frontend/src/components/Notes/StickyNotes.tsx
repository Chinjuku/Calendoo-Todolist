/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useEffect, useState, useContext, SetStateAction, useRef } from "react";
import Bin from "/public/svg/bin.svg";
import { showDate } from "@/api/get/Notes/getDates";
import { UserContext } from "@/contexts/api-get/UserContext";
import { NoteData } from "@/composables/React.types";
import moment from "moment";
import { TbEdit } from "react-icons/tb";
// @ts-expect-error
import DatePagination from "react-date-pagination";
import { queryDate } from "@/api/get/Notes/queryDate";
import { showNotes } from "@/api/get/Notes/getNote";
import { Button } from "../ui/button";
import { UpdateNote } from "./UpdateNote";
import { Modal } from "flowbite-react";
import { DeleteNote } from "./DeleteNote";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { OpenDelete, OpenModals } from "@/composables/React.types";
import DatePicker from "react-datepicker";
import { useQuery } from '@tanstack/react-query'
import { LoadData } from "../LoadData";

interface DateProps {
  date: string
}

const StickyNotes = () => {
  const date = useRef<DateProps[] | null>(null);
  const [note, setNote] = useState<NoteData[] | null>(null);
  const [allnotes, setAllNotes] = useState<NoteData[] | null>(null);
  const [openModals, setOpenModals] = useState<OpenModals>({});
  const [activePage, setActivePage] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [alert, setAlert] = useState<OpenDelete>({});
  const { user } = useContext(UserContext);
  const userId = user?.id ?? ""
  const toggleModal = (id: string) => {
    setOpenModals((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the state for the specific note id
    }));
  };
  const toggleAlert = (id: string) => {
    setAlert((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the state for the specific note id
    }));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const daysArray =
    date.current?.map((date) => ({ date: moment(date.date).format("YYYY-MM-DD") })) ||
    [];
  daysArray.push({ date: "" });
  const handlePageChange = async (pageNumber: number) => {
    setActivePage(pageNumber);
    const date = new Date(daysArray?.[pageNumber - 1].date);
    const dateFormat = moment(date).format("YYYY-MM-DD");
    const result = await queryDate(user?.id, dateFormat);
    setNote(result);
  };
  const { data: allnote, isLoading: allnoteLoading } = useQuery(
    {
    queryKey: ["allnote"],
    queryFn: () => showNotes(userId),
    enabled: !!userId,
    }
  );
  const today = moment(new Date()).format('YYYY-MM-DD');
  const { data: changeNote, isLoading: changeNoteLoading} = useQuery(
    {
    queryKey: ["changeNote", userId, today],
    queryFn: () => queryDate(userId, today),
    enabled: !!userId || !!today,
    }
  );
  const { data: dates } = useQuery({
    queryKey: ["dates"],
    queryFn: () => showDate(userId),
    enabled: !!userId,
  })
  const handleDateSelect = async (date: Date) => {
    if (!userId) return;
    const formatDate = moment(date).format("YYYY-MM-DD");
    const responseData = await queryDate(userId, formatDate);
    console.log(responseData);
    setNote(responseData);
  };
  useEffect(() => {
    if (dates) {
      date.current = dates
    }
    if(changeNote) {
      setNote(changeNote);
    }
    if(allnote) {
      setAllNotes(allnote);
    }
  }, [dates, changeNote, allnote]);
  const handleSetAllNotes = async () => {
    setNote(null);
    setAllNotes(allnote);
  };
  console.log(allnote)

  return (
    <div className="py-[15px] px-[30px] w-[71%] relative">
      <DatePicker
        className="py-[10px] px-[15px] text-secondary font-bold rounded-[10px] absolute left-[-385px] top-[99px]"
        selected={startDate}
        onSelect={handleDateSelect}
        onChange={(date: Date | null) => date && setStartDate(date)}
      />
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
          <Button className="mt-4" onClick={handleSetAllNotes}>
            Show All Notes
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 p-2 pr-5 auto-rows-max gap-4 h-[88%] overflow-auto">
        {/* Mapping Query Data per day */}
        { allnoteLoading || changeNoteLoading ? <LoadData /> : note != null && note.length != 0
          ? note.map((data) => (
              <div
                key={data.id}
                className="rounded-[12px] w-full h-[196px] relative p-4"
                style={{ backgroundColor: `${data.list.color}` }}
              >
                <h1 className="text-[28px]">{data.title}</h1>
                <p>{data.description}</p>
                <p className="absolute bottom-8 left-2">
                  Time: {moment(data.starttime).format("HH:mm") + '-' + moment(data.endtime).format("HH:mm")}
                </p>
                <p className="absolute bottom-2 left-2">
                  Date: {moment(data.date).format("YYYY-MM-DD")}
                </p>
                <div className="absolute right-2 top-2 bg-primary border border-black text-[22px]">
                  {data.piority === 1 ? (
                    <p className="text-green">
                      <MdKeyboardArrowUp />
                    </p>
                  ) : data.piority === 2 ? (
                    <p className="text-orange">
                      <MdKeyboardDoubleArrowUp />
                    </p>
                  ) : (
                    <p className="text-red-600">
                      <MdKeyboardArrowUp className="mb-[-13px]" />
                      <MdKeyboardDoubleArrowUp />
                    </p>
                  )}
                </div>
                <button onClick={() => toggleModal(data.id)}>
                  <TbEdit className="absolute bottom-2 right-[42px] w-8 h-8" />
                </button>
                {openModals[data.id] && ( // Render modal only if its corresponding state is true
                  <Modal
                    show={openModals[data.id]}
                    size={"3xl"}
                    onClose={() => toggleModal(data.id)}
                  >
                    <Modal.Body className="bg-primary rounded-xl">
                      <UpdateNote
                        handleClose={(ok: SetStateAction<OpenModals>) =>
                          setOpenModals(ok)
                        }
                        title={data.title}
                        description={data.description}
                        list={{
                          namelist: data.list.namelist,
                          color: data.list.color,
                          id: data.list.id,
                        }}
                        id={data.id}
                        date={data.date}
                        starttime={data.starttime}
                        endtime={data.endtime}
                        piority={data.piority}
                        userId={data.userId}
                      />
                    </Modal.Body>
                  </Modal>
                )}
                <button onClick={() => toggleAlert(data.id)}>
                  <img
                    className="absolute bottom-3 right-2 w-7 h-7 font-bold"
                    src={Bin}
                    alt=""
                  />
                </button>
                {alert[data.id] ? (
                  <Modal
                    show={alert[data.id]}
                    size={"3xl"}
                    onClose={() => toggleAlert(data.id)}
                  >
                    <Modal.Body className="bg-red-100 rounded-xl">
                      <DeleteNote
                        handleAlert={(bools) => setAlert(bools)}
                        id={data.id}
                      />
                    </Modal.Body>
                  </Modal>
                ) : null}
              </div>
            ))
          : allnotes != null
          ? allnotes.map((item) => (
              <div
                className="rounded-[12px] w-full h-[196px] relative p-4"
                style={{ backgroundColor: `${item.list.color}` }}
              >
                <h1 className="text-[28px]">{item.title}</h1>
                <p>{item.description}</p>
                <p className="absolute bottom-8 left-2">
                  Time: {moment(item.starttime).format("HH:mm") + '-' + moment(item.endtime).format("HH:mm")}
                </p>
                <p className="absolute bottom-2 left-2">
                  Date: {moment(item.date).format("YYYY-MM-DD")}
                </p>
                <div className="absolute right-2 top-2 bg-primary border border-black text-[22px]">
                  {item.piority === 1 ? (
                    <p className="text-green">
                      <MdKeyboardArrowUp />
                    </p>
                  ) : item.piority === 2 ? (
                    <p className="text-orange">
                      <MdKeyboardDoubleArrowUp />
                    </p>
                  ) : (
                    <p className="text-red-600">
                      <MdKeyboardArrowUp className="mb-[-13px]" />
                      <MdKeyboardDoubleArrowUp />
                    </p>
                  )}
                </div>
                <button onClick={() => toggleModal(item.id)}>
                  <TbEdit className="absolute bottom-2 right-[42px] w-8 h-8" />
                </button>
                {openModals[item.id] && (
                <Modal
                    show={openModals[item.id]}
                    size={"3xl"}
                    onClose={() => toggleModal(item.id)}
                  >
                  <Modal.Body className="bg-primary rounded-xl">
                    <UpdateNote
                      handleClose={(ok: SetStateAction<OpenModals>) =>
                        setOpenModals(ok)
                      }
                      title={item.title}
                      description={item.description}
                      list={{
                        namelist: item.list.namelist,
                        color: item.list.color,
                        id: item.list.id,
                      }}
                      id={item.id}
                      date={item.date}
                      starttime={item.starttime}
                      endtime={item.endtime}
                      piority={item.piority}
                      userId={item.userId}
                    />
                    </Modal.Body>
                  </Modal>
                )}
                <button onClick={() => toggleAlert(item.id)}>
                  <img
                    className="absolute bottom-3 right-2 w-7 h-7 font-bold"
                    src={Bin}
                    alt=""
                  />
                </button>
                {alert[item.id] ? (
                  <Modal
                    show={alert[item.id]}
                    size={"3xl"}
                    onClose={() => toggleAlert(item.id)}
                  >
                    <Modal.Body className="bg-red-100 rounded-xl">
                      <DeleteNote
                        handleAlert={(bools) => setAlert(bools)}
                        id={item.id}
                      />
                    </Modal.Body>
                  </Modal>
                ) : null}
              </div>
            ))
          : <div className="text-center flex justify-center text-6xl font-semibold text-secondary"><h1>No notes in this day</h1></div> }
      </div>
    </div>
  );
};

export default StickyNotes;
