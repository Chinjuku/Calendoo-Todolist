"use client"
import { useContext, useEffect, useState } from "react";
import AddList from "./AddList";
import { ListContext } from "@/contexts/api-get/ListContext";
import { Setup2 } from "@/composables/React.types";
import Add from "/svg/Add.svg";
import { countList } from "@/api/get/Notes/countAllNote";
import { UserContext } from "@/contexts/api-get/UserContext";

interface CountList {
    count: number;
    listId: string;
}

export const AllLists = () => {
  const { user } = useContext(UserContext);
  const { list } = useContext(ListContext);
  const [noteperList, setnoteperList] = useState<CountList[] | null>(null);
  const [openList, setopenList] = useState<Setup2>({ check: false });
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id || !list?.length) return; // Early return if no user or empty list
      const notesPerList = await Promise.all(
        list.map(async (list) => {
          const count = await countList(user.id, list.id);
          return { listId: list.id, count }; // Combine list ID and notes
        })
      );
      setnoteperList(notesPerList);
    };
    fetchData();
  }, [user?.id, list?.length, list]); // Only re-run on user ID or list length change

  return (
    <div>
      <p className="Second text-[20px]">Lists</p>
      <div className="h-[120px] overflow-y-auto">
        {/* Mapping Data Here */}
        {noteperList && noteperList.map((item) => (
          <div key={item.listId} className="text-[16px] h-[35px] w-full px-[15px] my-2 flex justify-between items-center">
            <div className="flex gap-[20px] w-[60%]">
              <div
                className={`h-[26px] w-[28px]`}
                style={{ backgroundColor: list?.find(listItem => listItem.id === item.listId)?.color }}
              ></div>
              <p className="text-secondary">{list?.find(listItem => listItem.id === item.listId)?.namelist}</p>
            </div>
            <p className="bg-hover1 px-2 py-1 rounded-[3px]">
                {
                    item.count === 0 ? 0 : item.count 
                }
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          setopenList((prevOpenNote) => ({ ...prevOpenNote, check: true }))
        }
        className="hover:bg-hover1 mt-[15px] rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center"
      >
        <img height={26} width={26} src={Add} alt="" />
        <p className="text-secondary">Add More List</p>
      </button>
      {openList.check == true ? (
        <AddList
          handleClick={(bools) => {
            setopenList({ check: bools });
          }}
        />
      ) : null}
    </div>
  );
};
