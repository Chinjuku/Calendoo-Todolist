import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { countAllNotes, countToday } from "@/api/get/Notes/countAllNote";
import { UserContext } from "@/contexts/api-get/UserContext";
import All from "/svg/All.svg";
import Today from "/svg/Today.svg";
import { LoadData } from "../LoadData";

export const CountNotes = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id ?? ""

  const { data: allnotes, isLoading: allNotesLoading, isError: allNotesError } = useQuery(
    {
    queryKey: ["allnotes"],
    queryFn: () => countAllNotes(userId),
    enabled: !!userId, // Only fetch data if user ID is available
    }
  );

  const { data: today, isLoading: todayLoading, isError: todayError } = useQuery(
    {
        queryKey: ["today"],
        queryFn: () => countToday(userId),
        enabled: !!userId, // Only fetch data if user ID is available
    }
  );

  return (
    <>
      <p className="Second text-[20px]">Notes</p>
      <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
        <div className="flex gap-[25px] w-[35%]">
          <img height={22} width={22} src={All} alt="" />
          <p className="text-secondary">All Notes</p>
        </div>
        <p className="bg-hover1 px-2 py-1 rounded-[3px]">
          {allNotesLoading ? <LoadData /> : allNotesError ? "Error" : allnotes}
        </p>
      </div>
      <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
        <div className="flex gap-[25px] w-[35%]">
          <img height={23} width={23} src={Today} alt="" />
          <p className="text-secondary">Today</p>
        </div>
        <p className="bg-hover1 px-2 py-1 rounded-[3px]">
          {todayLoading ? <LoadData /> : todayError ? "Error" : today}
        </p>
      </div>
    </>
  );
};

