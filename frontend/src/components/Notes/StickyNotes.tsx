"use client";
// import { Pagination } from "flowbite-react";
import { useEffect, useState, useContext } from "react";
import Bin from "/public/svg/bin.svg"
import { showNote } from "@/api/get/getNotes";
import { UserContext } from "@/contexts/api-get/UserContext";
import { NoteData } from "@/composables/Validation.types";
import moment from 'moment'
import { TbEdit } from "react-icons/tb";

const StickyNotes = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const onPageChange = (page: number) => setCurrentPage(page);
  const [note, setNote] = useState<NoteData[] | null>(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await showNote(user?.id);
      setNote(fetchedData)
      console.log(fetchedData)
    };
    fetchData();
    
  }, [user?.id]);

  return (
    <div className="py-[15px] px-[30px] w-[71%]">  
      <div className="flex justify-between">
        <h1 className="Second text-[40px]">Sticky Wall</h1>
        {/* <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={1000}
            onPageChange={onPageChange}
            previousLabel=""
            nextLabel=""
            showIcons
          />
        </div> */}
      </div>
      <div className="grid grid-cols-3 p-3 gap-4 h-[95%] overflow-auto">
        {/* Mapping Query Data per day */}
        {
          note && note.map((item) => (
            <div className="rounded-[12px] w-full h-[207px] relative p-4" style={{ backgroundColor: `${item.list.color}` }}>
              <h1 className="text-[28px]">{item.title}</h1>
              <p>{item.description}</p>
              <p className="absolute bottom-8 left-2">Time: {moment(item.time).format('HH:mm')}</p>
              <p className="absolute bottom-2 left-2">Date: {moment(item.date).format('YYYY-MM-DD')}</p>
              <button><TbEdit className="absolute bottom-2 right-[42px] w-8 h-8" /></button>
              <button><img className="absolute bottom-3 right-2 w-7 h-7 font-bold" src={Bin} alt="" /></button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default StickyNotes;
