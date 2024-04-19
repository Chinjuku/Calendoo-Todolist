import All from "/svg/All.svg";
import Today from "/svg/Today.svg";
import Calendars from "/svg/Calendar.svg";
import Stickywall from "/svg/Stickywall.svg";
import Add from "/svg/Add.svg";
// import Time from "/svg/Time.svg"
import { useEffect, useState } from "react";
import AddBoard from "./AddBoard";
import "react-datepicker/dist/react-datepicker.css";
import { showBoards } from "@/api/get/Board/getBoard";
import { useParams } from "react-router-dom";
import { countBoards } from "@/api/get/Board/countBoards";

interface ProjectNameProps {
  projectname: string;
  showBoard: (id: string, name: string, isStarred: boolean) => void;
  id: string;
}
interface BoardData {
  boardname: string;
  color: string;
  id: string;
  isStarred: boolean;
  projectId: string;
}

const Menu = (props: ProjectNameProps) => {
  const { projectId } = useParams();
  const [board, setBoard] = useState<BoardData[] | null>(null);
  const [countBoard, setCountBoard] = useState<number>(0);
  const [openBoard, setOpenBoard] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return; // Early return if no user or empty list
      const boards = await showBoards(projectId);
      setBoard(boards);
      const countboard = await countBoards(projectId);
      setCountBoard(countboard);
    };
    fetchData();
  }, [projectId]);
  return (
    <div className="h-full w-[22%] bg-hover rounded-[26px] p-[22px] text-secondary">
      <h1 className="Second text-[44px] text-center">{props.projectname}</h1>
      <div>
        <p className="Second text-[20px]">Tasks</p>
        <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
          <div className="flex gap-[25px] w-[60%]">
            <img height={22} width={22} src={All} alt="" />
            <p className="text-secondary">All Boards</p>
          </div>
          <p className="bg-hover1 px-2 py-1 rounded-[3px]">{countBoard}</p>
        </div>
        <div className="text-[16px] h-[35px] w-full px-[20px] my-2 flex justify-between items-center">
          <div className="flex gap-[25px] w-[35%]">
            <img height={23} width={23} src={Today} alt="" />
            <p className="text-secondary">Member</p>
          </div>
          <p className="bg-hover1 px-2 py-1 rounded-[3px]">{55}</p>
        </div>
        <button className="hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[16px] my-2 flex items-center">
          <img height={27} width={27} src={Stickywall} alt="" />
          <p className="text-secondary">Boards</p>
        </button>
        <button className="hover:bg-hover1 rounded-[10px] transition-all text-[16px] h-[35px] gap-[25px] w-full px-[20px] my-2 flex items-center">
          <img height={22} width={22} src={Calendars} alt="" />
          <p className="text-secondary">Calendar</p>
        </button>
      </div>
      <hr className="border border-secondary mx-[15px] my-[20px]" />
      <div>
        <div className="flex justify-between px-[15px] mb-2">
          <p className="Second text-[20px]">Boards</p>
          {/* Add Boards */}
          <button
            onClick={() => setOpenBoard(true)}
            className="hover:opacity-60 transition-all"
          >
            <img height={20} width={20} src={Add} alt="" />
          </button>
          {openBoard ? (
            <AddBoard handleSetup={(bools) => setOpenBoard(bools)} />
          ) : (
            ""
          )}
        </div>
        <div className="h-[120px] overflow-y-auto">
          {/* Mapping Data Here */}
          {board &&
            board.map((data) => (
              <button
                key={data.id}
                onClick={() =>
                  props.showBoard(data.id, data.boardname, data.isStarred)
                }
                className="text-[16px] h-[35px] w-full px-[20px] my-2 flex gap-4 items-center rounded-lg"
                style={{
                    background: props.id === data.id ? "#E0D8ED" : "",
                    transition: "500ms"
                }}
              >
                <div
                  key={data.id}
                  className="h-[25px] w-[26px]"
                  style={{ background: `${data.color}` }}
                ></div>
                <p key={data.id} className="text-secondary">
                  {data.boardname}
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
