import { useState, useEffect, useContext } from "react";
import { countAllNotes, countToday } from "@/api/get/Notes/countAllNote";
import { UserContext } from "@/contexts/api-get/UserContext";
import All from "/svg/All.svg";
import Today from "/svg/Today.svg";

export const CountNotes = () => {
  const { user } = useContext(UserContext);
  const [allnotes, setAllNotes] = useState(0);
  const [today, setToday] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const fetchAllNotes = await countAllNotes(user?.id);
      setAllNotes(fetchAllNotes);
      const fetchToday = await countToday(user?.id);
      setToday(fetchToday);
    };
    fetchData();
  }, [user?.id]);
  return (
    <>
      <p className="Second text-[20px]">Notes</p>
      <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
        <div className="flex gap-[25px] w-[35%]">
          <img height={22} width={22} src={All} alt="" />
          <p className="text-secondary">All Notes</p>
        </div>
        <p className="bg-hover1 px-2 py-1 rounded-[3px]">{allnotes}</p>
      </div>
      <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
        <div className="flex gap-[25px] w-[35%]">
          <img height={23} width={23} src={Today} alt="" />
          <p className="text-secondary">Today</p>
        </div>
        <p className="bg-hover1 px-2 py-1 rounded-[3px]">{today}</p>
      </div>
    </>
  );
};
